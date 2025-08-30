import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Shield, AlertTriangle, Scale, Mail } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <FileText className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Please read these terms carefully before using QuizGen. By using our service, you agree to these terms.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Last updated: January 7, 2024</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-blue-600" />
                  Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  By accessing and using QuizGen, you accept and agree to be bound by the terms and provision of this
                  agreement.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li>You must be at least 13 years old to use our service</li>
                  <li>You are responsible for maintaining the confidentiality of your account</li>
                  <li>You agree to provide accurate and complete information</li>
                  <li>You will not use the service for any unlawful purposes</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-green-600" />
                  User Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Account Security</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    <li>Keep your login credentials secure and confidential</li>
                    <li>Notify us immediately of any unauthorized access</li>
                    <li>You are responsible for all activities under your account</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Content Guidelines</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    <li>Create original content or ensure you have rights to use it</li>
                    <li>Do not post offensive, harmful, or inappropriate content</li>
                    <li>Respect intellectual property rights of others</li>
                    <li>Follow community guidelines and be respectful to other users</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Scale className="mr-2 h-5 w-5 text-purple-600" />
                  Intellectual Property
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Your Content</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      You retain ownership of the quizzes and content you create. By using our service, you grant us a
                      license to host, display, and distribute your content as necessary to provide our services.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Our Platform</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      QuizGen and its original content, features, and functionality are owned by us and are protected by
                      international copyright, trademark, and other intellectual property laws.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-yellow-600" />
                  Prohibited Uses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You may not use QuizGen for any of the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Violating any applicable laws or regulations</li>
                  <li>Transmitting malicious code or harmful content</li>
                  <li>Attempting to gain unauthorized access to our systems</li>
                  <li>Harassing, abusing, or harming other users</li>
                  <li>Spamming or sending unsolicited communications</li>
                  <li>Impersonating others or providing false information</li>
                  <li>Commercial use without proper authorization</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We strive to provide reliable service, but we cannot guarantee uninterrupted access:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li>We may temporarily suspend service for maintenance</li>
                  <li>We reserve the right to modify or discontinue features</li>
                  <li>We are not liable for service interruptions beyond our control</li>
                  <li>We will provide reasonable notice for planned maintenance</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">To the fullest extent permitted by law:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li>We provide the service "as is" without warranties</li>
                  <li>We are not liable for indirect or consequential damages</li>
                  <li>Our total liability is limited to the amount you paid us</li>
                  <li>Some jurisdictions may not allow these limitations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  We may update these terms from time to time. We will notify you of any material changes by posting the
                  new terms on this page and updating the "Last updated" date. Your continued use of the service after
                  such changes constitutes acceptance of the new terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-blue-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <p>
                    <strong>Email:</strong> legal@quizgen.com
                  </p>
                  <p>
                    <strong>Address:</strong> QuizGen Legal Team, 123 Learning Street, Education City, EC 12345
                  </p>
                  <p>
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
