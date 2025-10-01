import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { postService } from '../services/api';
import { Post } from '../types';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  Avatar,
  Card,
  CardContent,
  CardActions,
  Divider,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add,
  ThumbUp,
  Comment,
  Send,
} from '@mui/icons-material';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [commentingPostId, setCommentingPostId] = useState<string | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const response = await postService.getPosts();
      setPosts(response.posts);
    } catch (error: any) {
      setError('Erro ao carregar posts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;

    try {
      setIsCreatingPost(true);
      const response = await postService.createPost(newPostContent);
      setPosts([response.post, ...posts]);
      setNewPostContent('');
    } catch (error: any) {
      setError('Erro ao criar post');
    } finally {
      setIsCreatingPost(false);
    }
  };

  const handleLikePost = async (postId: string) => {
    try {
      const response = await postService.likePost(postId);
      setPosts(posts.map(post => 
        post._id === postId ? response.post : post
      ));
    } catch (error: any) {
      setError('Erro ao curtir post');
    }
  };

  const handleAddComment = async () => {
    if (!commentContent.trim() || !commentingPostId) return;

    try {
      const response = await postService.addComment(commentingPostId, commentContent);
      setPosts(posts.map(post => 
        post._id === commentingPostId ? response.post : post
      ));
      setCommentContent('');
      setCommentingPostId(null);
      setOpenDialog(false);
    } catch (error: any) {
      setError('Erro ao adicionar comentário');
    }
  };

  const openCommentDialog = (postId: string) => {
    setCommentingPostId(postId);
    setOpenDialog(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Feed
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ mr: 2 }}>
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h6">
            O que você está pensando?
          </Typography>
        </Box>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Compartilhe algo com a comunidade..."
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreatePost}
            disabled={isCreatingPost || !newPostContent.trim()}
          >
            {isCreatingPost ? 'Publicando...' : 'Publicar'}
          </Button>
        </Box>
      </Paper>

      {posts.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            Nenhum post encontrado
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Seja o primeiro a compartilhar algo!
          </Typography>
        </Paper>
      ) : (
        posts.map((post) => (
          <Card key={post._id} sx={{ mb: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{ mr: 2 }}>
                    {post.author?.name?.charAt(0)?.toUpperCase() || '?'}
                  </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {post.author?.name || 'Usuário'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(post.createdAt)}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {post.content}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  {post.likes.length} curtida{post.likes.length !== 1 ? 's' : ''}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {post.comments.length} comentário{post.comments.length !== 1 ? 's' : ''}
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<ThumbUp />}
                onClick={() => handleLikePost(post._id)}
                color={post.likes.includes(user?.id || '') ? 'primary' : 'inherit'}
              >
                Curtir
              </Button>
              <Button
                startIcon={<Comment />}
                onClick={() => openCommentDialog(post._id)}
              >
                Comentar
              </Button>
            </CardActions>

            {post.comments.length > 0 && (
              <Box sx={{ px: 2, pb: 2 }}>
                <Divider sx={{ mb: 2 }} />
                {post.comments.map((comment) => (
                  <Box key={comment._id} display="flex" alignItems="flex-start" mb={1}>
                    <Avatar sx={{ mr: 1, width: 24, height: 24 }}>
                      {comment.author?.name?.charAt(0)?.toUpperCase() || '?'}
                    </Avatar>
                    <Box>
                      <Typography variant="caption" fontWeight="bold">
                        {comment.author?.name || 'Usuário'}
                      </Typography>
                      <Typography variant="body2" display="block">
                        {comment.content}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Card>
        ))
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Adicionar comentário</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="Escreva seu comentário..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button
            onClick={handleAddComment}
            variant="contained"
            startIcon={<Send />}
            disabled={!commentContent.trim()}
          >
            Comentar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Feed;