import Link from "next/link";

// Footer.js
export default function Footer() {
  return (
    <footer className="bg-slate-800	 grid col-span-full text-white py-32">
      <ul className="list-none grid grid-cols-[repeat(auto-fit,_minmax(15rem,_1fr))] md:gap-8 items-center">
        <li className="nav__item">
          <Link
            href="/contact"
            className="text-sm text-white no-underline font-display uppercase text-center py-6 block transition-all duration-200 hover:bg-white/5 hover:-translate-y-1"
          >
            Request proposal
          </Link>
        </li>
        <li className="nav__item">
          <a
            href="#"
            className="text-sm text-white no-underline font-display uppercase text-center py-6 block transition-all duration-200 hover:bg-white/5 hover:-translate-y-1"
          >
            Download home planner
          </a>
        </li>
        <li className="nav__item">
          <Link
            href="/contact"
            className="text-sm text-white no-underline font-display uppercase text-center py-6 block transition-all duration-200 hover:bg-white/5 hover:-translate-y-1"
          >
            Contact us
          </Link>
        </li>
        <li className="nav__item">
          <a
            href="#"
            className="text-sm text-white no-underline font-display uppercase text-center py-6 block transition-all duration-200 hover:bg-white/5 hover:-translate-y-1"
          >
            Submit your property
          </a>
        </li>
        <li className="nav__item">
          <Link
            href="/contact"
            className="text-sm text-white no-underline font-display uppercase text-center py-6 block transition-all duration-200 hover:bg-white/5 hover:-translate-y-1"
          >
            Come work with us!
          </Link>
        </li>
      </ul>
      <p className="text-sm text-grey-light-2 mt-24 mx-auto text-center w-3/4">
        &copy; Copyright 2024 by ComfortsPlus.com
      </p>
    </footer>
  );
}
