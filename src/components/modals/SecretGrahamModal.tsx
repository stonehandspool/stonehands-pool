import { forwardRef } from 'react';

type SecretGrahamModalProps = {
  id?: string;
  closeModal: () => void;
};

const SecretGrahamModal = forwardRef<HTMLDivElement, SecretGrahamModalProps>((props, ref) => {
  const { id = 'secret-graham-modal', closeModal } = props;

  return (
    <div id={id} ref={ref} className="modal">
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-content">
        <div className="box">
          <h3 className="title has-text-centered">Congratulations!</h3>
          <h4 className="subtitle has-text-centered">You've discovered the "Secret Graham Award"!</h4>
          <p className="has-text-centered">
            Please email Ryan the following message to claim your reward and shoutout:
          </p>
          <p className="has-text-centered">
            <b>"Graham loves moving and Murphy does too! So the two of them will move around for you!"</b>
          </p>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
    </div>
  );
});

export default SecretGrahamModal;
