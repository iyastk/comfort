import Link from "next/link";
import React from "react";

const Navigation = () => {
  return (
    <>
      <Link href="/">Home</Link>
      <Link href="/portfolio">Our works</Link>
      <Link href="/services">Services</Link>
      <Link href="/contact">Contact us</Link>
      <Link href="/about">About us</Link>
    </>
  );
};

export default Navigation;
