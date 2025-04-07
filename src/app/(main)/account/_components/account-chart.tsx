"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { endOfDay, format, startOfDay, subDays } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DATE_RANGE = {
  "7D": { label: "Last 7 days", days: 7 },
  "1M": { label: "Last month", days: 30 },
  "3M": { label: "Last 3 months", days: 90 },
  "6M": { label: "Last 6 months", days: 180 },
  ALL: { label: "All time", days: null },
};

type Transaction = {
  id: string;
  date: string; // ISO format
  amount: number;
  type: "INCOME" | "EXPENSE";
};

type GroupedData = {
  date: string;
  income: number;
  expense: number;
};

interface AccountChartProps {
  transactions: Transaction[];
}

const AccountChart = ({ transactions }: AccountChartProps) => {
  const [dateRange, setDateRange] = useState<keyof typeof DATE_RANGE>("1M");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const filteredData: GroupedData[] = useMemo(() => {
    if (!hasMounted) return [];

    const range = DATE_RANGE[dateRange];
    const now = new Date();

    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    const filtered = transactions.filter(
      (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
    );

    const grouped = filtered.reduce<Record<string, GroupedData>>(
      (acc, transaction) => {
        const dateKey = format(new Date(transaction.date), "yyyy-MM-dd");

        if (!acc[dateKey]) {
          acc[dateKey] = {
            date: format(new Date(transaction.date), "MMM dd"),
            income: 0,
            expense: 0,
          };
        }

        if (transaction.type === "INCOME") {
          acc[dateKey].income += transaction.amount;
        } else {
          acc[dateKey].expense += transaction.amount;
        }

        return acc;
      },
      {}
    );

    return Object.values(grouped).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [transactions, dateRange, hasMounted]);

  const totals = useMemo(() => {
    if (!hasMounted) return { income: 0, expense: 0 };

    return filteredData.reduce(
      (acc, data) => ({
        income: acc.income + data.income,
        expense: acc.expense + data.expense,
      }),
      { income: 0, expense: 0 }
    );
  }, [filteredData, hasMounted]);

  if (!hasMounted) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-base font-normal">Overview</CardTitle>
        <Select
          defaultValue={dateRange}
          onValueChange={(value) =>
            setDateRange(value as keyof typeof DATE_RANGE)
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(DATE_RANGE).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around mb-6 text-sm">
          <div className="text-center">
            <p className="text-muted-foreground">Total Income</p>
            <p className="text-lg font-bold text-green-500">
              {totals.income.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Total Expense</p>
            <p className="text-lg font-bold text-red-500">
              {totals.expense.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Net</p>
            <p
              className={`text-lg font-bold ${
                totals.income - totals.expense >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {(totals.income - totals.expense).toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredData}
              margin={{
                top: 10,
                right: 10,
                left: 30,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `Rp.${value.toLocaleString("id-ID")}`}
              />
              <Tooltip
                formatter={(value) => [
                  `Rp.${value.toLocaleString("id-ID")}`,
                  undefined,
                ]}
              />
              <Legend />
              <Bar
                dataKey="income"
                name={"Income"}
                fill="#82ca9d"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="expense"
                name={"Expense"}
                fill="#F95454"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountChart;
