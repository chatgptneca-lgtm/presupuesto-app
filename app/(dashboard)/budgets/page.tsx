import { deleteMonthlyBudget, listBudgets, upsertMonthlyBudget } from "./actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

function getMonthOptions() {
  return Array.from({ length: 12 }, (_, index) => {
    const date = new Date(2024, index, 1);
    return {
      value: index + 1,
      label: new Intl.DateTimeFormat("es-CO", { month: "long" }).format(date)
    };
  });
}

export default async function BudgetsPage({
  searchParams
}: {
  searchParams?: { month?: string; year?: string };
}) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const selectedMonth = Number(searchParams?.month);
  const selectedYear = Number(searchParams?.year);
  const month =
    selectedMonth >= 1 && selectedMonth <= 12 ? selectedMonth : currentMonth;
  const year = selectedYear >= 2000 ? selectedYear : currentYear;
  const categories = await listBudgets(month, year);

  const totalBudgeted = categories.reduce((sum, category) => {
    const amount = category.monthlyBudgets[0]?.amount ?? 0;
    return sum + amount;
  }, 0);

  const monthOptions = getMonthOptions();
  const yearOptions = Array.from({ length: 5 }, (_, index) => currentYear - 2 + index);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Presupuestos por categoría</CardTitle>
          <CardDescription>
            Ajusta los montos mensuales y mantén el control por cada categoría.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form action="/budgets" method="get" className="flex flex-wrap gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Mes</label>
              <select
                name="month"
                defaultValue={month}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                {monthOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Año</label>
              <select
                name="year"
                defaultValue={year}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                {yearOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button type="submit" variant="secondary">
                Ver periodo
              </Button>
            </div>
          </form>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardDescription>Total presupuestado</CardDescription>
                <CardTitle>{currencyFormatter.format(totalBudgeted)}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardDescription>Categorías disponibles</CardDescription>
                <CardTitle>{categories.length}</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detalle por categoría</CardTitle>
          <CardDescription>
            Ingresa el monto en COP y guarda los cambios por categoría.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Categoría</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Monto (COP)</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-muted-foreground">
                    No hay categorías aún. Crea una en la sección de categorías.
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => {
                  const budget = category.monthlyBudgets[0];
                  const formId = `budget-${category.id}`;
                  return (
                    <TableRow key={category.id}>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>
                        {category.type === "INCOME" ? "Ingreso" : "Gasto"}
                      </TableCell>
                      <TableCell>
                        <Input
                          name="amount"
                          type="number"
                          min={0}
                          step={1000}
                          form={formId}
                          defaultValue={budget?.amount ?? ""}
                          placeholder="0"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-wrap justify-end gap-2">
                          <form id={formId} action={upsertMonthlyBudget}>
                            <input type="hidden" name="categoryId" value={category.id} />
                            <input type="hidden" name="month" value={month} />
                            <input type="hidden" name="year" value={year} />
                            <Button type="submit" size="sm">
                              Guardar
                            </Button>
                          </form>
                          <form action={deleteMonthlyBudget}>
                            <input type="hidden" name="id" value={budget?.id ?? ""} />
                            <Button
                              type="submit"
                              size="sm"
                              variant="outline"
                              disabled={!budget}
                            >
                              Eliminar
                            </Button>
                          </form>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
