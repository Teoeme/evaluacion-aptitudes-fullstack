import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../app/store/store';
import authActions from '../../app/providers/auth/authActions';

const REVALIDATION_INTERVAL = 5 * 60 * 1000; // 5 minutos, igual que el backend
const MIN_TIME_BETWEEN_REVALIDATIONS = 5 * 1000; // 5 segundos para evitar ráfagas

export const useTokenRevalidation = () => {
  const dispatcher = useDispatch<AppDispatch>();
  const lastRevalidationTimestamp = useRef<number>(0);

  const revalidateToken = async () => {
    const now = Date.now();
    if (now - lastRevalidationTimestamp.current < MIN_TIME_BETWEEN_REVALIDATIONS) {
      return;
    }

    lastRevalidationTimestamp.current = now;
    await dispatcher(authActions.revalidateTokenSilently());
  };

  useEffect(() => {
    window.addEventListener('focus', revalidateToken);

    const intervalId = setInterval(revalidateToken, REVALIDATION_INTERVAL);

    return () => {
      window.removeEventListener('focus', revalidateToken);
      clearInterval(intervalId);
    };
  }, []);
};
