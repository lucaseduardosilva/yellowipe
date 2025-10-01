import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Nome deve ter pelo menos 2 caracteres',
    'string.max': 'Nome não pode ter mais de 50 caracteres',
    'any.required': 'Nome é obrigatório'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email inválido',
    'any.required': 'Email é obrigatório'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Senha deve ter pelo menos 6 caracteres',
    'any.required': 'Senha é obrigatória'
  })
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email inválido',
    'any.required': 'Email é obrigatório'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Senha é obrigatória'
  })
});

export const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(50).messages({
    'string.min': 'Nome deve ter pelo menos 2 caracteres',
    'string.max': 'Nome não pode ter mais de 50 caracteres'
  }),
  bio: Joi.string().max(200).allow('').messages({
    'string.max': 'Bio não pode ter mais de 200 caracteres'
  })
});

export const postSchema = Joi.object({
  content: Joi.string().min(1).max(1000).required().messages({
    'string.min': 'Post deve ter pelo menos 1 caractere',
    'string.max': 'Post não pode ter mais de 1000 caracteres',
    'any.required': 'Conteúdo do post é obrigatório'
  })
});

export const commentSchema = Joi.object({
  content: Joi.string().min(1).max(500).required().messages({
    'string.min': 'Comentário deve ter pelo menos 1 caractere',
    'string.max': 'Comentário não pode ter mais de 500 caracteres',
    'any.required': 'Conteúdo do comentário é obrigatório'
  })
});
