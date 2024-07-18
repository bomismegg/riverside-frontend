import { useEffect } from 'react';

import { useRouter } from 'src/routes/hooks';

const useAuth = () => {
    const router = useRouter();
    
    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');

        if (!accessToken && router.pathname !== '/activate-account') {
            router.push('/login');
        }
    }, [router]);
};

export default useAuth;
