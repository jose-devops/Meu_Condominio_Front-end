// ConfirmDialog.jsx
import React from 'react';

import warningLogo from '../IMG/ICON/warning-logo.png';  // Caminho relativo correto




import './ConfirmDialog.css'; // Crie esse CSS para estilizar


export default function ConfirmDialog({ mensagem, onConfirm, onCancel }) {
  
  return (
    <div className="confirm-dialog-background">
      
      
      <div className="confirm-dialog">
        <div className='lateral-barra'/>
        <div className='icon-area-message'>
          <img src={warningLogo} alt="warning-logo" className="icon-warning-dialog" />

        </div>
      
          <div className="dialog-message-area">

            <div className='message-area'>
              <p>{mensagem}</p>

            </div>

            <div className="confirm-dialog-buttons">
              <button className="btn-cancel" onClick={onCancel}>Cancelar</button>
              <button className="btn-confirm" onClick={onConfirm}>Excluir</button>
            </div>

 
        </div>


      </div>
    </div>
  );
}
