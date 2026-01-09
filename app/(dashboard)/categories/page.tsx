import {
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory
} from "./actions";
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

const typeLabels: Record<"INCOME" | "EXPENSE", string> = {
  INCOME: "Ingreso",
  EXPENSE: "Gasto"
};

export default async function CategoriesPage() {
  const categories = await listCategories();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Categorías</CardTitle>
          <CardDescription>
            Crea y administra las categorías para tus ingresos y gastos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={createCategory}
            className="flex flex-col gap-4 md:flex-row md:items-end"
          >
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Nombre</label>
              <Input name="name" placeholder="Ej. Marketing" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo</label>
              <select
                name="type"
                defaultValue="EXPENSE"
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="INCOME">{typeLabels.INCOME}</option>
                <option value="EXPENSE">{typeLabels.EXPENSE}</option>
              </select>
            </div>
            <Button type="submit">Agregar</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Listado</CardTitle>
          <CardDescription>
            Mantén las categorías actualizadas para un presupuesto claro.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-muted-foreground">
                    Aún no hay categorías registradas.
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => {
                  const formId = `update-${category.id}`;
                  return (
                    <TableRow key={category.id}>
                      <TableCell>
                        <Input
                          name="name"
                          defaultValue={category.name}
                          form={formId}
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <select
                          name="type"
                          defaultValue={category.type}
                          form={formId}
                          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                        >
                          <option value="INCOME">{typeLabels.INCOME}</option>
                          <option value="EXPENSE">{typeLabels.EXPENSE}</option>
                        </select>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-wrap justify-end gap-2">
                          <form id={formId} action={updateCategory}>
                            <input type="hidden" name="id" value={category.id} />
                            <Button type="submit" size="sm">
                              Guardar
                            </Button>
                          </form>
                          <form action={deleteCategory}>
                            <input type="hidden" name="id" value={category.id} />
                            <Button type="submit" size="sm" variant="outline">
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
