import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen  px-6 md:px-20 py-12 text-gray-800 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-4 text-center text-primary">Privacy Policy</h1>
                <p className="text-lg mb-8 text-center text-gray-600">Effective Date: January 1, 2025</p>

                <section className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-primary mb-2">1. Introduction</h2>
                        <p>
                            At WanderWay Travel Agency, your privacy is important to us. This Privacy Policy explains how we collect, use,
                            and protect your information when you use our website or services.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-primary mb-2">2. Information We Collect</h2>
                        <p>
                            We collect information that you provide directly to us such as your name, email, booking details, and payment
                            information. We may also gather technical data like your browser type and IP address to improve your experience.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-primary mb-2">3. How We Use Your Information</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>To confirm and manage your bookings</li>
                            <li>To provide customer support</li>
                            <li>To improve our website and services</li>
                            <li>To send you updates and promotional offers (with your consent)</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-primary mb-2">4. Sharing Your Information</h2>
                        <p>
                            We do not sell your personal information. We only share it with third parties involved in fulfilling your travel
                            services or as required by law.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-primary mb-2">5. Data Security</h2>
                        <p>
                            We use strong encryption and security measures to protect your data. However, no online platform is 100% secure.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-primary mb-2">6. Your Choices</h2>
                        <p>
                            You can update your preferences or opt-out of marketing communications at any time by contacting us or updating
                            your account settings.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-primary mb-2">7. Contact Us</h2>
                        <p>
                            If you have any questions about this policy, reach out at: <br />
                            📧 <a href="mailto:support@wanderway.com" className="text-blue-600 underline">support@skyight.com</a>
                        </p>
                    </div>
                </section>

                <footer className="mt-12 text-center text-gray-500 text-sm">
                    &copy; 2024 Techxudo. All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
