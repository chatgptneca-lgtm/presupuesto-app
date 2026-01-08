"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { ChartContainer } from "@/components/charts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const summary = [
  { label: "Presupuesto mensual", value: "$12,400" },
  { label: "Gasto actual", value: "$8,950" },
  { label: "Ahorro estimado", value: "$3,450" }
];

const chartData = [
  { month: "Ene", amount: 1200 },
  { month: "Feb", amount: 980 },
  { month: "Mar", amount: 1420 },
  { month: "Abr", amount: 1600 },
  { month: "May", amount: 1320 },
  { month: "Jun", amount: 1520 }
];

const recentBudgets = [
  { name: "Marketing", amount: "$2,400", status: "Activo" },
  { name: "Operaciones", amount: "$3,100", status: "Pendiente" },
  { name: "Producto", amount: "$1,850", status: "Activo" }
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        {summary.map((item) => (
          <Card key={item.label}>
            <CardHeader>
              <CardDescription>{item.label}</CardDescription>
              <CardTitle>{item.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Distribución mensual</CardTitle>
            <CardDescription>
              Evolución de gastos durante el semestre
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer>
              <BarChart data={chartData} margin={{ left: 0, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip cursor={{ fill: "hsl(var(--muted))" }} />
                <Bar dataKey="amount" fill="hsl(var(--primary))" radius={6} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Presupuestos recientes</CardTitle>
            <CardDescription>Últimos ajustes registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Área</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBudgets.map((budget) => (
                  <TableRow key={budget.name}>
                    <TableCell>{budget.name}</TableCell>
                    <TableCell>{budget.amount}</TableCell>
                    <TableCell>{budget.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
