import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Edit, Download, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold">ResumeForge</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#templates" className="text-muted-foreground hover:text-foreground transition-colors">
                Templates
              </a>
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <Button asChild variant="outline" className="mr-2">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/editor">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-primary bg-clip-text text-transparent">
            Create professional resumes in minutes
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Build stunning resumes with our easy-to-use editor, 10 professional templates, and real-time preview.
          </p>
          <Button size="lg" asChild className="text-lg px-8 py-4">
            <Link to="/editor" className="flex items-center gap-2">
              Create Your Resume <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section id="features" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Edit className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">1. Enter Your Details</h3>
                <p className="text-muted-foreground">
                  Fill in your information using our intuitive form editor.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">2. Choose a Template</h3>
                <p className="text-muted-foreground">
                  Select from 10 professionally designed templates.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Download className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">3. Download Your Resume</h3>
                <p className="text-muted-foreground">
                  Preview in real-time and download your resume as a PDF.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Templates Preview */}
      <section id="templates" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16">Featured Templates</h2>
          
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { name: "Modern", color: "bg-blue-500" },
              { name: "Classic", color: "bg-gray-700" },
              { name: "Creative", color: "bg-purple-500" },
              { name: "Professional", color: "bg-gray-800" },
            ].map((template) => (
              <Card key={template.name} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className={`h-48 ${template.color} relative`}>
                  <div className="absolute inset-4 bg-white/20 rounded backdrop-blur-sm">
                    <div className="p-3 space-y-2">
                      <div className="h-3 bg-white/60 rounded w-3/4"></div>
                      <div className="h-2 bg-white/40 rounded w-1/2"></div>
                      <div className="space-y-1 mt-4">
                        <div className="h-2 bg-white/40 rounded"></div>
                        <div className="h-2 bg-white/40 rounded w-4/5"></div>
                        <div className="h-2 bg-white/40 rounded w-3/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold">{template.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/editor">View All Templates</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Create Your Resume?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who have built their careers with ResumeForge
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-4">
            <Link to="/editor" className="flex items-center gap-2">
              Start Building Now <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-primary p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">ResumeForge</h3>
              </div>
              <p className="text-muted-foreground">
                Create professional resumes that get you hired.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 ResumeForge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;