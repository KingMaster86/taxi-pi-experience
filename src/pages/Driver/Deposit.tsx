import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Check, CreditCard, Wallet, Coins } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const PI_NETWORK_CONFIG = {
  apiKey: "votocj7mgzciz1obvejvabvxuqlkmfckliw8wshf7ccng5voqfaz82l2wvns3xr8",
  sandboxMode: true,
  version: "2.0"
};

const Deposit = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<
    "bank" | "credit_card" | "crypto" | "pi"
  >("bank");
  const [depositAmount, setDepositAmount] = useState("50000");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cryptoType, setCryptoType] = useState("ETH");
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Copied to clipboard",
      description: "Address has been copied to your clipboard",
    });
  };

  const handleSubmit = () => {
    if (!depositAmount || Number(depositAmount) < 50000) {
      toast({
        title: "Error",
        description: "Minimum deposit amount is Rp 50,000",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setPaymentComplete(true);
      toast({
        title: "Payment Successful",
        description: `Your account has been credited with Rp ${Number(
          depositAmount
        ).toLocaleString()}`,
      });
    }, 2000);
  };

  const resetForm = () => {
    setPaymentComplete(false);
    setDepositAmount("50000");
  };

  const handleGoBack = () => {
    navigate("/driver/dashboard");
  };

  const navigateToPaymentDetails = () => {
    // Find the payment-details tab trigger and click it
    const paymentDetailsTab = document.querySelector('[data-value="payment-details"]');
    if (paymentDetailsTab && paymentDetailsTab instanceof HTMLElement) {
      paymentDetailsTab.click();
    }
  };

  const cryptoAddresses = {
    PI: "GDTHELMFZMBJRMWGZ27LVQINCYZVAUCOH7RMYYO5MRUEC4QZW2AFTYYV",
    BTC: "bc1q5a9tavaxvr38mw8lmlmp026kwm246sf7927dt8",
    ETH: "0xC46003CF5a56018eE426b7C59557A5083C7796f5",
  };

  const minDeposits = {
    PI: "1 PI",
    BTC: "0.00005 BTC",
    ETH: "0.001 ETH",
    DOGE: "0.001 DOGE",
    BNB: "0.001 BNB",
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-2xl font-bold">Deposit Funds</h2>
        </div>

        {paymentComplete ? (
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold">Deposit Successful!</h3>
            <p className="text-muted-foreground">
              Your account has been credited with{" "}
              <span className="font-medium">
                Rp {Number(depositAmount).toLocaleString()}
              </span>
            </p>
            <div className="pt-4 space-y-3">
              <Button
                className="w-full bg-taxi-purple hover:bg-taxi-purple-dark button-animation"
                onClick={handleGoBack}
              >
                Back to Dashboard
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={resetForm}
              >
                Make Another Deposit
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="amount">Deposit Amount (Rp)</Label>
              <Input
                id="amount"
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="input-focus"
                min="50000"
                step="10000"
              />
              <p className="text-xs text-muted-foreground">
                Minimum deposit: Rp 50,000
              </p>
            </div>

            <Tabs defaultValue="payment-method" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="payment-method">Payment Method</TabsTrigger>
                <TabsTrigger value="payment-details">
                  Payment Details
                </TabsTrigger>
              </TabsList>

              <TabsContent value="payment-method" className="space-y-4">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) =>
                    setPaymentMethod(
                      value as "bank" | "credit_card" | "crypto" | "pi"
                    )
                  }
                >
                  <div className="space-y-3">
                    <div className="relative">
                      <RadioGroupItem
                        value="bank"
                        id="bank"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="bank"
                        className={cn(
                          "flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all",
                          "peer-focus-visible:ring-2 peer-focus-visible:ring-taxi-purple peer-focus-visible:ring-offset-2",
                          paymentMethod === "bank"
                            ? "border-taxi-purple bg-taxi-purple/5"
                            : "border-border"
                        )}
                      >
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-taxi-purple">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium">Bank Transfer</p>
                          <p className="text-xs text-muted-foreground">
                            Transfer to our bank account
                          </p>
                        </div>
                      </Label>
                    </div>

                    <div className="relative">
                      <RadioGroupItem
                        value="credit_card"
                        id="credit_card"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="credit_card"
                        className={cn(
                          "flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all",
                          "peer-focus-visible:ring-2 peer-focus-visible:ring-taxi-purple peer-focus-visible:ring-offset-2",
                          paymentMethod === "credit_card"
                            ? "border-taxi-purple bg-taxi-purple/5"
                            : "border-border"
                        )}
                      >
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-taxi-purple">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium">Credit/Debit Card</p>
                          <p className="text-xs text-muted-foreground">
                            Pay with Visa, Mastercard, etc.
                          </p>
                        </div>
                      </Label>
                    </div>

                    <div className="relative">
                      <RadioGroupItem
                        value="crypto"
                        id="crypto"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="crypto"
                        className={cn(
                          "flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all",
                          "peer-focus-visible:ring-2 peer-focus-visible:ring-taxi-purple peer-focus-visible:ring-offset-2",
                          paymentMethod === "crypto"
                            ? "border-taxi-purple bg-taxi-purple/5"
                            : "border-border"
                        )}
                      >
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-taxi-purple">
                          <Wallet className="h-5 w-5" />
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium">Cryptocurrency</p>
                          <p className="text-xs text-muted-foreground">
                            Pay with BTC, ETH, DOGE, BNB
                          </p>
                        </div>
                      </Label>
                    </div>

                    <div className="relative">
                      <RadioGroupItem
                        value="pi"
                        id="pi"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="pi"
                        className={cn(
                          "flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all",
                          "peer-focus-visible:ring-2 peer-focus-visible:ring-taxi-purple peer-focus-visible:ring-offset-2",
                          paymentMethod === "pi"
                            ? "border-taxi-purple bg-taxi-purple/5"
                            : "border-border"
                        )}
                      >
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-taxi-purple">
                          <Coins className="h-5 w-5" />
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium">Pi Network</p>
                          <p className="text-xs text-muted-foreground">
                            Pay with Pi cryptocurrency
                          </p>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                <Button
                  className="w-full bg-taxi-purple hover:bg-taxi-purple-dark button-animation mt-6"
                  onClick={navigateToPaymentDetails}
                >
                  Continue
                </Button>
              </TabsContent>

              <TabsContent value="payment-details" className="space-y-6">
                {paymentMethod === "bank" && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-secondary">
                      <p className="text-sm font-medium mb-1">
                        Bank Account Details
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <p className="text-sm text-muted-foreground">
                            Account Number
                          </p>
                          <p className="text-sm font-medium">5537014569</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-muted-foreground">
                            Account Name
                          </p>
                          <p className="text-sm font-medium">TAXI PI</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-muted-foreground">Bank</p>
                          <p className="text-sm font-medium">Bank Central Asia</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-amber-200 bg-amber-50">
                      <p className="text-sm text-amber-800">
                        Please include your driver ID in the transfer description.
                        Your funds will be credited within 1 business day.
                      </p>
                    </div>

                    <Button
                      className="w-full bg-taxi-purple hover:bg-taxi-purple-dark button-animation"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Processing..."
                        : "I've Completed the Transfer"}
                    </Button>
                  </div>
                )}

                {paymentMethod === "credit_card" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card_number">Card Number</Label>
                      <Input
                        id="card_number"
                        placeholder="1234 5678 9012 3456"
                        className="input-focus"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          className="input-focus"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          className="input-focus"
                          type="password"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Cardholder Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="input-focus"
                      />
                    </div>

                    <Button
                      className="w-full bg-taxi-purple hover:bg-taxi-purple-dark button-animation"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Pay Now"}
                    </Button>
                  </div>
                )}

                {paymentMethod === "crypto" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="crypto_type">Select Cryptocurrency</Label>
                      <select
                        id="crypto_type"
                        className="w-full h-10 px-3 py-2 text-base rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        value={cryptoType}
                        onChange={(e) => setCryptoType(e.target.value)}
                      >
                        <option value="ETH">Ethereum (ETH)</option>
                        <option value="BTC">Bitcoin (BTC)</option>
                        <option value="DOGE">Dogecoin (DOGE)</option>
                        <option value="BNB">Binance Coin (BNB)</option>
                      </select>
                    </div>

                    <div className="p-4 rounded-lg bg-secondary">
                      <p className="text-sm font-medium mb-2">
                        Send {cryptoType === "BTC" ? minDeposits.BTC : cryptoType === "ETH" ? minDeposits.ETH : minDeposits.BNB} to this address:
                      </p>
                      <div className="relative">
                        <Input
                          value={
                            cryptoType === "BTC"
                              ? cryptoAddresses.BTC
                              : cryptoAddresses.ETH
                          }
                          readOnly
                          className="pr-10 font-mono text-xs"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                          onClick={() =>
                            handleCopyAddress(
                              cryptoType === "BTC"
                                ? cryptoAddresses.BTC
                                : cryptoAddresses.ETH
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-amber-200 bg-amber-50">
                      <p className="text-sm text-amber-800">
                        <span className="font-medium">Minimum deposit:</span>{" "}
                        {cryptoType === "BTC"
                          ? minDeposits.BTC
                          : cryptoType === "ETH"
                          ? minDeposits.ETH
                          : cryptoType === "DOGE"
                          ? minDeposits.DOGE
                          : minDeposits.BNB}
                        . Funds will be credited after confirmation on the
                        blockchain.
                      </p>
                    </div>

                    <Button
                      className="w-full bg-taxi-purple hover:bg-taxi-purple-dark button-animation"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Processing..."
                        : "I've Completed the Transfer"}
                    </Button>
                  </div>
                )}

                {paymentMethod === "pi" && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-secondary">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Pi Wallet Address</p>
                        <img
                          src="https://minepi.com/wp-content/uploads/2020/06/pi_network_logo_dark.png"
                          alt="Pi Network"
                          className="h-5"
                        />
                      </div>
                      <div className="relative">
                        <Input
                          value={cryptoAddresses.PI}
                          readOnly
                          className="pr-10 font-mono text-xs"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                          onClick={() => handleCopyAddress(cryptoAddresses.PI)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        </Button>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground">
                          API Key: {PI_NETWORK_CONFIG.apiKey}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-amber-200 bg-amber-50">
                      <p className="text-sm text-amber-800">
                        <span className="font-medium">Minimum deposit:</span>{" "}
                        {minDeposits.PI}. Please use the Pi Browser to send your
                        payment. Your balance will be updated within 1-2 hours.
                      </p>
                    </div>

                    <Button
                      className="w-full bg-taxi-purple hover:bg-taxi-purple-dark button-animation"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Processing..."
                        : "I've Completed the Transfer"}
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
};

export default Deposit;
