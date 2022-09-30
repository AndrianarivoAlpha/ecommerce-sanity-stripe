import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ( { children } ) =>
{
    const [ showCart, setshowCart ] = useState( false );
    const [ cartItems, setcartItems ] = useState( [] );
    const [ totalPrice, setotalPrice ] = useState( 0 );
    const [ totalQuantities, settotalQuantities ] = useState( 0 );
    const [ qty, setqty ] = useState( 1 );

    let foundProduct;
    let index;

    const onAdd = ( product, quantity ) =>
    {
        const checkProductInCart = cartItems.find( ( item ) => item._id === product._id );

        setotalPrice( ( prevTotalPrice ) => prevTotalPrice + product.price * quantity );
        settotalQuantities( ( prevTotalQuantities ) => prevTotalQuantities + quantity );

        if ( checkProductInCart )
        {
            const updatedCartItems = cartItems.map( ( cartProduct ) =>
            {
                if ( cartProduct._id === product._id ) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            } )

            setcartItems( updatedCartItems );
        } else
        {
            product.quantity = quantity;

            setcartItems( [ ...cartItems, { ...product } ] );
        }
        toast.success( `${ qty } ${ product.name } added to the cart.` );
    }

    const onRemove = (product) =>
    {
        foundProduct = cartItems.find( ( item ) => item._id === product._id );
        const newCartItems = cartItems.filter( ( item ) => item._id !== product._id );

        setotalPrice( ( prevTotalPrice ) => prevTotalPrice - foundProduct.price * foundProduct.quantity )
        settotalQuantities( prevTotalQuantities => prevTotalQuantities - foundProduct.quantity )
        setcartItems(newCartItems)
    }

    const toggleCartItemQuantity = ( id, value ) =>
    {
        foundProduct = cartItems.find( ( item ) => item._id === id );

        //console.log( foundProduct );

        index = cartItems.findIndex( ( product ) => product._id === id );
        const newCartItems = cartItems.filter( ( item ) => item._id !== id );

        if ( value === 'inc' )
        {
            setcartItems( [ ...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ] )
            setotalPrice( ( prevTotalPrice ) => prevTotalPrice + foundProduct.price )
            settotalQuantities( prevTotalQuantities => prevTotalQuantities + 1 )

        } else if ( value === 'dec' )
        {
            if ( foundProduct.quantity > 1 )
            {
                setcartItems( [ ...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ] )
                setotalPrice( ( prevTotalPrice ) => prevTotalPrice - foundProduct.price )
                settotalQuantities( prevTotalQuantities => prevTotalQuantities - 1 )

            }
        }
    }

    const incQty = () =>
    {
        setqty( ( prevQty ) => prevQty + 1 )
    }
    const decQty = () =>
    {
        setqty( ( prevQty ) =>
        {
            if ( prevQty - 1 < 1 )
                return 1;
            return prevQty - 1;
        } )
    }

    return (
        <Context.Provider
            value={ {
                setshowCart,
                setcartItems,
                setotalPrice,
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                settotalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove
            } }
        >
            { children }
        </Context.Provider>
    )
}

export const useStateContext = () => useContext( Context );