'use client';
import { useState, FormEvent } from 'react';
import { RegisterCredentials } from '../types/auth';
import { useAuth } from '@/hooks/aueAuth';

interface AuthFormProps {
  isRegister?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isRegister = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'TENANT',
  });
  const { login, register, loading, error } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      await register(formData as RegisterCredentials);
    } else {
      await login({ email: formData.email, password: formData.password });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      {isRegister && (
        <div>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              first Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
      </div>
      {isRegister && (
        <div className="mb-4">
          <label htmlFor="role" className="block mb-2">
            Role
          </label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="TENANT">Tenant</option>
            <option value="LANDLORD">Landlord</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
      )}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {loading ? 'Processing...' : isRegister ? 'Register' : 'Login'}
      </button>
    </form>
  );
};

export default AuthForm;
