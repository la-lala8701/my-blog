'use client';
import { ModalContent } from '@/app/types';

export const ConfirmationModal = ({
  modalContent,
  closeModal,
}: {
  modalContent: ModalContent;
  closeModal: () => void;
}) => {
  return (
    <div className="bg-black/50 fixed top-0 right-0 left-0 bottom-0 z-20">
      <dl className="w-10/12 max-w-md absolute top-1/2 left-1/2 -translate-1/2 bg-white rounded-lg">
        <dt
          className={`${modalContent.bgColor} px-6 py-4 text-white font-bold text-2xl rounded-t-lg`}
        >
          {modalContent.title}
        </dt>
        <dd className="px-6 py-4">
          <p className="text-lg">{modalContent.message}</p>
          <div className="flex gap-3 justify-end mt-12 mb-2">
            <button
              onClick={() => closeModal()}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-400 cursor-pointer inline-block"
            >
              いいえ
            </button>
            <button
              onClick={modalContent.handleAction}
              className={`${modalContent.bgColor} ${modalContent.hoverColor} px-4 py-2 text-white rounded-md cursor-pointer inline-block`}
            >
              はい
            </button>
          </div>
        </dd>
      </dl>
    </div>
  );
};
