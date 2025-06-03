// ConfirmDialog.jsx
import React from 'react';
import './ConfirmDialog.css'; // Crie esse CSS para estilizar

export default function ConfirmDialog({ mensagem, onConfirm, onCancel }) {
  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <div className="confirm-dialog-message">
          <span>⚠️</span>
          <p>{mensagem}</p>
        </div>
        <div className="confirm-dialog-buttons">
          <button className="btn-cancel" onClick={onCancel}>CANCELAR</button>
          <button className="btn-confirm" onClick={onConfirm}>CONFIRMAR</button>
        </div>
      </div>
    </div>
  );
}
