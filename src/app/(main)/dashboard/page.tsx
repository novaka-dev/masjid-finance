import CreateAccountSheet from "@/components/create-account-sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";

const Dashboard = () => {
  return (
    <div className="px-5">
      {/* Budget Progress */}

      {/* Overview */}

      {/* Accounts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountSheet>
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
            <CardContent className="flex flex-col items-center justify-center h-full pt-5 text-muted-foreground">
              <Plus className="h-10 w-10 mb-2 " />
              <p className="text-sm font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountSheet>
      </div>
    </div>
  );
};

export default Dashboard;
