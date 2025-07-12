import FeatureCard from '@/components/Features/FeatureCard';
import features from '@/data/features';

const Features = () => {
    return (
        <div className="mx-auto py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Revolutionary Shopping Features
                    </h1>
                    <br />
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Experience the future of e-commerce with our comprehensive suite of AI-powered features
                        designed to transform every aspect of the customer journey.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <FeatureCard key={idx} {...feature} />
                    ))}
                </div>
            </div>
            <br />
        </div>
    );
};

export default Features;
