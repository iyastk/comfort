// Footer.js
export default function Footer() {
  return (
    <footer className="bg-slate-800	 grid col-span-full text-white py-32">
      <ul className="list-none grid grid-cols-[repeat(auto-fit,_minmax(15rem,_1fr))] gap-8 items-center">
        <li className="nav__item">
          <a
            href="#"
            className="text-sm text-white no-underline font-display uppercase text-center py-6 block transition-all duration-200 hover:bg-white/5 hover:-translate-y-1"
          >
            Request proposal
          </a>
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
          <a
            href="#"
            className="text-sm text-white no-underline font-display uppercase text-center py-6 block transition-all duration-200 hover:bg-white/5 hover:-translate-y-1"
          >
            Contact us
          </a>
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
          <a
            href="#"
            className="text-sm text-white no-underline font-display uppercase text-center py-6 block transition-all duration-200 hover:bg-white/5 hover:-translate-y-1"
          >
            Come work with us!
          </a>
        </li>
      </ul>
      <p className="text-sm text-grey-light-2 mt-24 mx-auto text-center w-3/4">
        &copy; Copyright 2024 by iyas TK. Feel free to use this project for your
        own purposes. This does NOT apply if you plan to produce your own course
        or tutorials based on this project.
      </p>
    </footer>
  );
}
