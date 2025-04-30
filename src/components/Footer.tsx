import {
  FacebookIcon,
  InstagramIcon,
  MessageCircleHeart,
  TwitterIcon,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#113013] text-slate-50 font-primary ">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-8 lg:py-12">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                ShareBite
              </span>
            </a>
            <p className="mt-2 max-w-xs text-sm text-slate-300">
              Reducing food waste and fighting hunger — one shared bite at a
              time.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6">
            {/* About Us */}
            <div>
              <h2 className="mb-4 text-sm font-semibold tracking-wide uppercase text-slate-200">
                About
              </h2>
              <ul className="text-slate-400 text-sm space-y-3">
                <li>
                  <a href="#" className="hover:text-white hover:underline">
                    Our Story
                  </a>
                </li>
               
              </ul>
            </div>

            {/* Support */}
            <div>
              <h2 className="mb-4 text-sm font-semibold tracking-wide uppercase text-slate-200">
                Support
              </h2>
              <ul className="text-slate-400 text-sm space-y-3">
                <li>
                  <a href="#" className="hover:text-white hover:underline">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white hover:underline">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white hover:underline">
                    Safety & Policies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white hover:underline">
                    Returns
                  </a>
                </li>
              </ul>
            </div>

            {/* Get Involved */}
            <div>
              <h2 className="mb-4 text-sm font-semibold tracking-wide uppercase text-slate-200">
                Get Involved
              </h2>
              <ul className="text-slate-400 text-sm space-y-3">
                <li>
                  <a href="#" className="hover:text-white hover:underline">
                    Become a Volunteer
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white hover:underline">
                    Donate Food
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white hover:underline">
                    Sponsor a Kiosk
                  </a>
                </li>
              </ul>
            </div>

        
          </div>
        </div>
        <hr className="my-6 border-slate-700 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <a href="#" className="text-slate-400 hover:text-slate-100">
              <FacebookIcon className="w-5 h-5" />
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-100">
              <InstagramIcon className="w-5 h-5" />
              <span className="sr-only">Instagram page</span>
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-100">
              <TwitterIcon className="w-5 h-5" />
              <span className="sr-only">Twitter page</span>
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-100">
              <MessageCircleHeart className="w-5 h-5" />
              <span className="sr-only">Pinterest page</span>
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-slate-400">
          Built with <span className=" animate-pulse">❤️</span> by the ShareBite team using React-Socket.IO NodeJS and MongoDB.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
