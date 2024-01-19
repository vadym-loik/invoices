import AddForm from './AddForm';
import Link from 'next/link';
export default async function AddPartnerPage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  return (
    <div>
      {searchParams.success ? (
        <div className="wrapper">
          <p>{"Vous vennez d'ajouter un partenaire"}</p>
          <Link
            href={'/admin/partners'}
            prefetch={false}
          >
            Revenir aux tous partenaires
          </Link>
        </div>
      ) : (
        <AddForm />
      )}
    </div>
  );
}
