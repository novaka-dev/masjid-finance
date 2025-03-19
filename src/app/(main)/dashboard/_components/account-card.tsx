import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Account {
  id: string;
  name: string;
  balance: number;
  type: string;
  isDefault: boolean;
}
const AccountCard: React.FC<{ account: Account }> = ({ account }) => {
  const { name, balance, type, id, isDefault } = account;
  return (
    <Card className="hover:shadow-md transition-shadow group relative">
      <Link href={`/account/${id}`}>
        <CardHeader className="flex justify-between items-center flex-row space-y-0 pb-3">
          <CardTitle className="text-sm font-medium capitalize">
            {name}
          </CardTitle>
          <Switch checked={isDefault} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Rp. {balance.toFixed(2)}</div>

          <p className="text-xs text-muted-foreground">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            Income
          </div>
          <div className="flex items-center">
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default AccountCard;
