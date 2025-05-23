import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from './ui/button'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';

const PlaidLink = ({ user, variant}: PlaidLinkProps) => {
    const router = useRouter();
    
    const [token, setToken] = useState('');

    useEffect(() => {
        const getLinkToken = async () => {
        const data = await createLinkToken(user);

        setToken(data?.linkToken);
        }

        getLinkToken();
    }, [user]);
    
    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        await exchangePublicToken({
            publicToken: public_token,
            user,
        })

        router.push('/');
    }, [user])
    
    const config: PlaidLinkOptions = {
        token,
        onSuccess,
    }

    const { open, ready } = usePlaidLink(config);

  return (
    <>
    {variant === "primary" ? (
        <Button 
        onClick={() => open()}
        disabled={!ready}
        className='plaidlink-primary hover:bg-gray-100 hover:text-primary transition-colors'>
            Connect bank
        </Button>
    ) : variant === "ghost" ? (
        <Button onClick={()=> open()} variant="ghost"
        className="plaidlink-ghost flex items-center gap-2 px-3 py-2 rounded transition-colors hover:bg-gray-100 hover:text-primary">
            <Image
                src="/icons/connect-bank.svg"
                alt="connect bank"
                width={24}
                height={24}
            />
            <p className="hidden text-16 font-semibold 
            text-black-2 xl:block">Connect bank</p>
        </Button>
    ) : (
        <Button onClick={()=> open()} className="plaidlink-default">
            <Image
                src="/icons/connect-bank.svg"
                alt="connect bank"
                width={24}
                height={24}
            />
            <p className="text-16 font-semibold text-black-2">Connect bank</p>
        </Button>
    )}
    </>
  )
}

export default PlaidLink