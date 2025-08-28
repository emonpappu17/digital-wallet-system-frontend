import { Wallet } from 'lucide-react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div>
            <Link to="/" className="flex items-center">
                <div className="p-2 rounded-xl ">
                    <Wallet className="h-6 w-6 text-primary" />
                </div>
                {/* <span className="text-xl font-bold ">PayWave</span> */}
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-sky-400 dark:to-indigo-400">
                    PayWave
                </span>
            </Link>
        </div>
    );
};

export default Logo;