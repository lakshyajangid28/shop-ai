import Button from "../Button";
import { Mic, ShoppingBag } from "lucide-react";
import Link from "next/link";

const HeroCTAButtons = () => (
  <div className="flex flex-col sm:flex-row gap-4">
    <Link href="/ai-agent">
      <Button
        size="lg"
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4"
      >
        <Mic className="h-5 w-5 mr-2" />
        Try Shopping Assistants
      </Button>
    </Link>
    <Link href="/shop">
      <Button
        size="lg"
        variant="outline"
        className="text-lg px-8 py-4 border-purple-200 hover:bg-purple-50"
      >
        <ShoppingBag className="h-5 w-5 mr-2" />
        Browse Products
      </Button>
    </Link>
  </div>
);

export default HeroCTAButtons;
