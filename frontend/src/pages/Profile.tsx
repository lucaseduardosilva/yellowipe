import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userService, authService } from '../services/api';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Alert,
  CircularProgress,
  Divider,
  Grid,
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
} from '@mui/icons-material';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
  });

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userProfile = await authService.getProfile();
        updateUser(userProfile);
        setFormData(prev => ({
          ...prev,
          name: userProfile.name,
          bio: userProfile.bio || '',
        }));
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      }
    };

    if (!user?.createdAt) {
      loadUserProfile();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');

      const response = await userService.updateProfile(formData);
      updateUser(response.user);
      setSuccess('Perfil atualizado com sucesso!');
      setIsEditing(false);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Erro ao atualizar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      bio: user?.bio || '',
    });
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Meu Perfil
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  fontSize: '3rem',
                  mb: 2,
                }}
              >
                {user?.name?.charAt(0)?.toUpperCase() || '?'}
              </Avatar>
              <Typography variant="h6" align="center">
                {user?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Membro desde {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={8}>
            <Box 
              display="flex" 
              justifyContent="space-between" 
              alignItems="center" 
              mb={2}
              sx={{
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'stretch', sm: 'center' },
                gap: { xs: 2, sm: 0 }
              }}
            >
              <Typography variant="h6">
                Informações do Perfil
              </Typography>
              <Button
                variant={isEditing ? "outlined" : "contained"}
                startIcon={isEditing ? <Cancel /> : <Edit />}
                onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                disabled={isLoading}
                sx={{ alignSelf: { xs: 'flex-start', sm: 'auto' } }}
              >
                {isEditing ? 'Cancelar' : 'Editar'}
              </Button>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box component="form" noValidate>
              <TextField
                fullWidth
                label="Nome"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing || isLoading}
                margin="normal"
                variant={isEditing ? "outlined" : "filled"}
              />

              <TextField
                fullWidth
                label="Email"
                value={user?.email || ''}
                disabled
                margin="normal"
                variant="filled"
                helperText="Email não pode ser alterado"
              />

              <TextField
                fullWidth
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!isEditing || isLoading}
                margin="normal"
                multiline
                rows={4}
                variant={isEditing ? "outlined" : "filled"}
                placeholder="Conte um pouco sobre você..."
              />

              {isEditing && (
                <Box display="flex" justifyContent="flex-end" mt={3}>
                  <Button
                    variant="contained"
                    startIcon={isLoading ? <CircularProgress size={20} /> : <Save />}
                    onClick={handleSave}
                    disabled={isLoading}
                    sx={{ ml: 1 }}
                  >
                    {isLoading ? 'Salvando...' : 'Salvar'}
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

    </Container>
  );
};

export default Profile;