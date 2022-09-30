import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'
import { useRouter } from 'next/router'

import { useStateContext } from '../context/StateContext'
import { runFireWorks } from '../lib/util'

const Success = () =>
{
    const { setcartItems, setotalPrice, settotalQuantities } = useStateContext();
    const [ order, setOrder ] = useState( null );
    useEffect( () =>
    {
        localStorage.clear();
        setcartItems( [] );
        setotalPrice( 0 );
        settotalQuantities( 0 );
        runFireWorks();
    }, [] )


    return (
        <div className='success-wrapper'>
            <div className="success">
                <p className="icon">
                    <BsBagCheckFill />
                </p>
                <h2>Thank you for your order!</h2>
                <p className="email-msg">
                    Check your email inbox for the recipt.
                </p>
                <p className="description">
                    If you have any question, please email
                    <a className='email' href="mailto:order@example.com">
                        order@example.com
                    </a>
                </p>
                <Link href={ "/" }>
                    <button type='button' width='300px' className='btn'>
                        Continue shopping
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Success