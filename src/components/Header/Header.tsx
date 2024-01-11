import './header.scss';
import Image from 'next/image';
import Link from 'next/link';
import { SignInButton } from '@clerk/nextjs';
import { SignOutButton } from '@clerk/nextjs';
import Button from './Button';
import { auth } from '@clerk/nextjs';

const Header = () => {
  const { userId }: { userId: string | null } = auth();

  return (
    <>
      <div className="header">
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

        <div className="header-nav">
          <nav>
            <ul className="header-nav__list">
              <li>
                <Button
                  href="/"
                  text="Accueil"
                />
              </li>
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
                    <span className="link">Connection</span>
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
