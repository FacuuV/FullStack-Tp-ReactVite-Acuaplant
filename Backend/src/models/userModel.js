import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true, // Asegura que no haya dos usuarios con el mismo email
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
  },
}, {
  timestamps: true, // Añade createdAt y updatedAt automáticamente
});

// --- ¡ESTA ES LA PARTE CLAVE QUE FALTA! ---
// Hook de Mongoose que se ejecuta ANTES de guardar un documento (.save())
userSchema.pre('save', async function(next) {
  // Si la contraseña no ha sido modificada, no hagas nada y continúa
  if (!this.isModified('password')) {
    return next();
  }

  // Genera el "salt" para la encriptación
  const salt = await bcrypt.genSalt(10);
  // Hashea (encripta) la contraseña con el salt
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar la contraseña ingresada con la de la base de datos
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema);

export default User;
