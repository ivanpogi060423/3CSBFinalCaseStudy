import { GiShoppingCart } from "react-icons/gi";
export default function Header() {
    return (
        <div className="header">
            <div className="title">
                <GiShoppingCart className="cart-icon" />
                <h4>Pagod na'ko</h4>
            </div>
        </div>
    );
}