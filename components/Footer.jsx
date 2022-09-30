import React from 'react';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

const Footer = () =>
{
	return (
		<div className="footer-container">
			<p>2022 JSM All rights reserved.</p>
			<p className="icons">
				<a
					href="https://www.instagram.com"
					target="_blank"
					rel="noreferrer"
				>
					<AiFillInstagram />
				</a>
				<a
					href="https://www.twitter.com"
					target="_blank"
					rel="noreferrer"
				>
					<AiOutlineTwitter />
				</a>
			</p>
		</div>
	);
}

export default Footer