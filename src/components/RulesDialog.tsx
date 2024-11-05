import { useRef } from "react";

const RulesDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        className="absolute bottom-10 right-10 rounded-lg border-2 border-white px-8 py-2 uppercase tracking-widest"
        onClick={() => dialogRef.current?.showModal()}
      >
        Rules
      </button>

      <dialog
        ref={dialogRef}
        className="rounded-lg p-8 pt-4 backdrop:bg-black/50"
      >
        <div className="relative">
          <h2 className="text-2xl font-bold uppercase text-gray-700">Rules</h2>
          <img
            src="/images/image-rules.svg"
            alt="Game Rules"
            className="mt-8 w-full max-w-md"
          />
          <button
            onClick={() => dialogRef.current?.close()}
            className="absolute right-0 top-0 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      </dialog>
    </>
  );
};

export default RulesDialog;
