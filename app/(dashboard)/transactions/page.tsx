import { listTransactions } from "./actions";
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

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
});

export default async function TransactionsPage() {
  const transactions = await listTransactions();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Transacciones</CardTitle>
          <CardDescription>Historial de ingresos y gastos.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-muted-foreground">
                    Aún no hay transacciones registradas.
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {new Intl.DateTimeFormat("es-CO").format(transaction.date)}
                    </TableCell>
                    <TableCell>{transaction.category?.name ?? "Sin categoría"}</TableCell>
                    <TableCell>
                      {transaction.type === "INCOME" ? "Ingreso" : "Gasto"}
                    </TableCell>
                    <TableCell className="text-right">
                      {currencyFormatter.format(transaction.amount)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
