import Image from 'next/image';
import { Link, Button } from '@nextui-org/react';

export const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-black text-white">
      <div className="flex items-center cursor-default">
        <Image
          src="/logo.png"
          alt="Logo"
          width={48}
          height={48}
          className="mr-2"
        />
        <h1 className="text-2xl font-bold">
          SpinsterPool
          <span className="ml-2 text-lg font-normal text-gray-400">
            Preview Generator
          </span>
        </h1>
      </div>
      <nav>
        <Button
          href="https://spinsterpool.com/"
          as={Link}
          color="primary"
          showAnchorIcon
          variant="faded"
          isExternal
        >
          Home
        </Button>
      </nav>
    </header>
  );
};
