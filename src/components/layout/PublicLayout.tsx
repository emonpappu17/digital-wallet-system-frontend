import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface IProps {
    children: ReactNode
}

const PublicLayout = ({ children }: IProps) => {
    return (
        <div>
            <Navbar></Navbar>
            <div>
                {children}
            </div>
            <Footer></Footer>
        </div>
    );
};

export default PublicLayout;