import { PieChart, Pie, Legend, Cell, ResponsiveContainer, Label } from "recharts";

const lol = () => {
    const COLORS = ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"];
    return (<ResponsiveContainer>
        <PieChart>
          <Pie
            data={data01}
            dataKey="value"
            cx={200}
            cy={200}
            innerRadius={80}
            outerRadius={130}
          >
            {data01.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend content={<CustomizedLegend />} />
        </PieChart>
      </ResponsiveContainer>)
}