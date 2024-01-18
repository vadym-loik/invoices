'use client';
import { deletePartner } from './action';
import { useState } from 'react';

export default function DeletePartner({ id }: { id: number }) {
  const [deleteP, setDeleteP] = useState(false);

  return (
    <>
      {!deleteP ? (
        <button onClick={() => setDeleteP(true)}>Delete this partner</button>
      ) : (
        <div>
          Are you sure ?
          <button
            onClick={async () => {
              await deletePartner(id);
              setDeleteP(false);
            }}
          >
            Yes
          </button>
          <button onClick={() => setDeleteP(false)}>No</button>
        </div>
      )}
    </>
  );
}
