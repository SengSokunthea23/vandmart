import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Store,
  Users,
  Shield,
  Truck,
  CreditCard,
  Headphones,
  Award,
  Globe,
  Clock,
  Star,
  CheckCircle,
  Heart,
  Target,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { getCategories } from "@/lib/actions";

export default async function AboutPage() {
  const { data: categories } = await getCategories();
  const features = [
    {
      icon: Shield,
      title: "Secure Shopping",
      description:
        "SSL encryption and secure payment processing for your safety",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Free shipping on orders over $100, express delivery available",
    },
    {
      icon: CreditCard,
      title: "Multiple Payment Options",
      description: "Credit cards, PayPal, and other secure payment methods",
    },
    {
      icon: Headphones,
      title: "24/7 Customer Support",
      description: "Round-the-clock support via chat, email, and phone",
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "30-day return policy and quality assurance on all products",
    },
    {
      icon: Globe,
      title: "Worldwide Shipping",
      description: "We deliver to over 50 countries around the globe",
    },
  ];

  const stats = [
    { number: "50,000+", label: "Happy Customers", icon: Users },
    { number: "10,000+", label: "Products Available", icon: Store },
    { number: "4.8/5", label: "Customer Rating", icon: Star },
    { number: "99.9%", label: "Uptime Guarantee", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header categories={categories} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About VandMart</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Your trusted online marketplace for quality products, exceptional
            service, and unbeatable prices. We've been serving customers
            worldwide since 2020.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/">
              <Button size="lg" variant="secondary">
                Shop Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-black border-white hover:bg-white hover:text-blue-600"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Target className="h-6 w-6 mr-3 text-blue-600" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  To provide customers with access to high-quality products at
                  competitive prices, while delivering exceptional customer
                  service and creating a seamless online shopping experience
                  that exceeds expectations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Heart className="h-6 w-6 mr-3 text-red-600" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  To become the world's most trusted and customer-centric
                  e-commerce platform, where people can find and discover
                  anything they want to buy online, backed by outstanding
                  service and innovation.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            ShopMart by the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <Icon className="h-8 w-8 mx-auto mb-4 text-blue-600" />
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Product Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Product Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories?.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <Badge variant="secondary">{categories?.length}</Badge>
                  </div>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <Link
                    href={`/category/${category.name
                      .toLowerCase()
                      .replace(" & ", "-")
                      .replace(" ", "-")}`}
                  >
                    <Button variant="outline" size="sm">
                      Browse {category.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose ShopMart?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Company Story */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-gray-600 mb-4">
                    Founded in 2020 by a team of passionate entrepreneurs,
                    ShopMart began as a small startup with a big vision: to
                    revolutionize online shopping by putting customers first.
                  </p>
                  <p className="text-gray-600 mb-4">
                    What started as a simple idea has grown into a thriving
                    marketplace serving customers across the globe. We've built
                    our reputation on three core principles: quality products,
                    competitive prices, and exceptional customer service.
                  </p>
                  <p className="text-gray-600 mb-6">
                    Today, we're proud to offer over 10,000 products across
                    multiple categories, working with trusted suppliers and
                    brands to ensure every purchase meets our high standards of
                    quality and value.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span>Curated product selection</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span>Competitive pricing guarantee</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span>Fast and reliable shipping</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span>Outstanding customer support</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg">
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    Our Commitment
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Zap className="h-6 w-6 text-yellow-500 mr-3 mt-1" />
                      <div>
                        <h4 className="font-semibold">Innovation</h4>
                        <p className="text-sm text-gray-600">
                          Continuously improving our platform and services
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Shield className="h-6 w-6 text-blue-500 mr-3 mt-1" />
                      <div>
                        <h4 className="font-semibold">Security</h4>
                        <p className="text-sm text-gray-600">
                          Protecting your data and transactions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Heart className="h-6 w-6 text-red-500 mr-3 mt-1" />
                      <div>
                        <h4 className="font-semibold">Customer Care</h4>
                        <p className="text-sm text-gray-600">
                          Putting your satisfaction first, always
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Information */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center">
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <Headphones className="h-8 w-8 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Customer Support</h3>
                  <p className="text-gray-600 mb-2">Available 24/7</p>
                  <p className="text-blue-600">support@shopmart.com</p>
                  <p className="text-blue-600">1-800-SHOPMART</p>
                </div>

                <div>
                  <Store className="h-8 w-8 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Business Inquiries</h3>
                  <p className="text-gray-600 mb-2">Partnership & Sales</p>
                  <p className="text-blue-600">business@shopmart.com</p>
                  <p className="text-blue-600">1-800-BUSINESS</p>
                </div>

                <div>
                  <Globe className="h-8 w-8 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Headquarters</h3>
                  <p className="text-gray-600 mb-2">123 Commerce Street</p>
                  <p className="text-gray-600">Tech City, TC 12345</p>
                  <p className="text-gray-600">United States</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Shopping?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of satisfied customers and discover amazing
                products at unbeatable prices.
              </p>
              <div className="space-x-4">
                <Link href="/">
                  <Button size="lg" variant="secondary">
                    Browse All Products
                  </Button>
                </Link>
                <Link href="/cart">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-black border-white hover:bg-white hover:text-blue-600"
                  >
                    View Cart
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
