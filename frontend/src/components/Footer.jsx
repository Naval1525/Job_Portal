import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">JobConnect</h3>
          <p className="text-gray-400 text-sm">
            Bridging talent with opportunities across industries.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">Home</a></li>
            <li><a href="#" className="hover:text-blue-400">Jobs</a></li>
            <li><a href="#" className="hover:text-blue-400">Companies</a></li>
            <li><a href="#" className="hover:text-blue-400">About Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-400">Cookie Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Mail size={16} /><span>support@jobconnect.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={16} /><span>+91 9876 543210</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} /><span>Bangalore, India</span>
            </div>
          </div>
        </div>

        <div className="col-span-full border-t border-gray-700 pt-6 mt-6 flex justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2024 JobConnect. All Rights Reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <Github size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;