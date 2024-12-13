
import { nestApiInstance } from '@/config/api';
import { RegisterAndLogin } from '@/Types/Auth';

class AuthService {
    static async register(
        newData: RegisterAndLogin,
    ): Promise<RegisterAndLogin | undefined> {
        try {
            const response = await nestApiInstance.post(
                '/auth/register',
                newData,
            );
            return response.data.data;
        } catch (error) {
          
            console.error('Error fetching register:', error);
        }
    }
}

export default AuthService;
