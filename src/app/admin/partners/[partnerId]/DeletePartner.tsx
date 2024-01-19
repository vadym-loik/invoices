'use client';
import './partnerId.scss';
import { deletePartner } from './action';
import { useState } from 'react';

export default function DeletePartner({ id }: { id: number }) {
  const [deleteP, setDeleteP] = useState(false);

  return (
    <>
      {!deleteP ? (
        <button
          className="delete-btn"
          onClick={() => setDeleteP(true)}
        >
          Supprimer le partenaire
        </button>
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
