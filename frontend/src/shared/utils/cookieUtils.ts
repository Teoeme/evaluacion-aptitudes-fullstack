/**
 * Utilidades para manejo de cookies con soporte para cookies secure
 */

export interface CookieOptions {
    expires?: Date;
    maxAge?: number;
    domain?: string;
    path?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Obtiene el valor de una cookie por su nombre
 */
export const getCookie = (name: string): string | null => {
    try {
        if (typeof document === 'undefined') {
            return null;
        }

        // Busca la cookie en document.cookie
        const cookies = document.cookie.split('; ');
        const cookie = cookies.find(row => row.startsWith(`${name}=`));
        
        if (cookie) {
            return cookie.split('=')[1];
        }

        return null;
    } catch (error) {
        console.warn(`Error al acceder a la cookie '${name}':`, error);
        return null;
    }
};

/**
 * Establece una cookie con las opciones especificadas
 */
export const setCookie = (name: string, value: string, options: CookieOptions = {}): boolean => {
    try {
        if (typeof document === 'undefined') {
            console.warn('setCookie: document no está disponible (posiblemente SSR)');
            return false;
        }

        let cookieString = `${name}=${value}`;

        if (options.expires) {
            cookieString += `; expires=${options.expires.toUTCString()}`;
        }

        if (options.maxAge) {
            cookieString += `; max-age=${options.maxAge}`;
        }

        if (options.domain) {
            cookieString += `; domain=${options.domain}`;
        }

        if (options.path) {
            cookieString += `; path=${options.path}`;
        }

        if (options.secure) {
            cookieString += '; secure';
        }

        if (options.httpOnly) {
            cookieString += '; httponly';
        }

        if (options.sameSite) {
            cookieString += `; samesite=${options.sameSite}`;
        }

        document.cookie = cookieString;
        return true;
    } catch (error) {
        console.error(`Error al establecer la cookie '${name}':`, error);
        return false;
    }
};

/**
 * Elimina una cookie
 */
export const deleteCookie = (name: string, options: Pick<CookieOptions, 'domain' | 'path'> = {}): boolean => {
    try {
        return setCookie(name, '', {
            ...options,
            expires: new Date(0)
        });
    } catch (error) {
        console.error(`Error al eliminar la cookie '${name}':`, error);
        return false;
    }
};

/**
 * Verifica si las cookies están disponibles
 */
export const areCookiesAvailable = (): boolean => {
    try {
        if (typeof document === 'undefined') {
            return false;
        }

        // Intenta establecer una cookie de prueba
        const testCookieName = '__test_cookie__';
        setCookie(testCookieName, 'test');
        const testValue = getCookie(testCookieName);
        
        if (testValue === 'test') {
            deleteCookie(testCookieName);
            return true;
        }
        
        return false;
    } catch {
        return false;
    }
};


/**
 * Obtiene todas las cookies como un objeto
 */
export const getAllCookies = (): Record<string, string> => {
    try {
        if (typeof document === 'undefined') {
            return {};
        }

        const cookies: Record<string, string> = {};
        
        document.cookie.split('; ').forEach(cookie => {
            const [name, value] = cookie.split('=');
            if (name && value) {
                cookies[name] = value;
            }
        });

        return cookies;
    } catch (error) {
        console.warn('Error al obtener todas las cookies:', error);
        return {};
    }
};
