import { Button } from '@/components/ui/button'
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-card/30 border-t border-border py-16 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
                <span className="text-2xl font-bold text-primary-foreground">
                  {'</>'}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-primary">CodeContest</h3>
            </div>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed max-w-md">
              The ultimate platform for competitive programming. Join thousands
              of developers improving their skills daily and competing in
              exciting challenges.
            </p>
            <div className="flex gap-4">
              <Button
                size="sm"
                variant="ghost"
                className="text-primary hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-primary hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-primary hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-primary hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-card-foreground mb-6 text-lg">
              Platform
            </h4>
            <ul className="space-y-3">
              {['About Us', 'Contact', 'Careers', 'Blog', 'Help Center'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors text-base"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-card-foreground mb-6 text-lg">
              Legal
            </h4>
            <ul className="space-y-3">
              {[
                'Terms of Service',
                'Privacy Policy',
                'Cookie Policy',
                'Code of Conduct',
                'Community Guidelines',
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors text-base"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-center md:text-left">
              © 2024 CodeContest. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span>for developers worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
