import './header.scss';
import Image from 'next/image';
import Link from 'next/link';
import { SignInButton } from '@clerk/nextjs';
import { SignOutButton } from '@clerk/nextjs';
import Button from './Button';
import { auth } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

const Header = async () => {
  const { userId }: { userId: string | null } = auth();
  const user = await currentUser();
  const isNotAdmin =
    !user ||
    !user.privateMetadata ||
    !('role' in user.privateMetadata) ||
    ('role' in user.privateMetadata &&
      typeof user.privateMetadata.role === 'string' &&
      !user.privateMetadata.role.includes('admin'));

  return (
    <>
      <div className="header">
        <Link
          href={'/'}
          className="header-heading"
        >
          <div className="header-wrap">
            <Image
              className="header-logo"
              width={30}
              height={40}
              src="/hopways_logo.webp"
              alt="hopways logo"
            />
            <h1 className="header-heading">Hopways Facture</h1>
          </div>
        </Link>

        <div className="header-nav">
          <nav>
            <ul className="header-nav__list">
              <li>
                <Button
                  href="/"
                  text="Accueil"
                />
              </li>
              {isNotAdmin ? null : (
                <li className="dropdown">
                  <Button
                    href="/admin"
                    text="Admin"
                  />
                  <div className="dropdown-content">
                    <Link
                      className="dropdown-item"
                      href="/admin/invoices"
                    >
                      Factures
                    </Link>
                    <Link
                      className="dropdown-item"
                      href="/admin/partners"
                    >
                      Partnaires
                    </Link>
                  </div>
                </li>
              )}
              {/* <li className="dropdown">
                <Button
                  href="/partner"
                  text="Partenaire"
                />
                <div className="dropdown-content">
                  <Link
                    className="dropdown-item"
                    href="/partner/invoices"
                  >
                    Mes factures
                  </Link>
                  <Link
                    className="dropdown-item"
                    href="/partner/info"
                  >
                    Mes info
                  </Link>
                </div>
              </li> */}
              <li>
                {userId ? (
                  <SignOutButton>
                    <span className="link">Déconnexion</span>
                  </SignOutButton>
                ) : (
                  <SignInButton>
                    <span className="link">Connecxion</span>
                  </SignInButton>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
