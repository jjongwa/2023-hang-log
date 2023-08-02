import { EXPENSE_CHART_COLORS } from '@constants/expense';
import { CURRENCY_ICON, DEFAULT_CURRENCY } from '@constants/trip';
import { Box, Heading } from 'hang-log-design-system';

import { formatNumberToMoney } from '@utils/formatter';

import { useExpense } from '@hooks/expense/useExpense';

import type { Segment } from '@components/common/DonutChart/DonutChart';
import DonutChart from '@components/common/DonutChart/DonutChart';
import ExpenseCategoryInformation from '@components/expense/ExpenseCategoryInformation/ExpenseCategoryInformation';
import ExpenseInformation from '@components/expense/ExpenseInformation/ExpenseInformation';
import {
  containerStyling,
  totalAmountStyling,
} from '@components/expense/TotalExpenseSection/TotalExpenseSection.style';

interface TotalExpenseSectionProps {
  tripId: number;
}

const TotalExpenseSection = ({ tripId }: TotalExpenseSectionProps) => {
  const { expenseData } = useExpense(tripId);

  const chartData = expenseData.categories.reduce<Segment[]>((acc, curr) => {
    const data = {
      id: curr.category.id,
      percentage: curr.percentage,
      color: EXPENSE_CHART_COLORS[curr.category.name],
    };

    acc.push(data);

    return acc;
  }, []);

  return (
    <section css={containerStyling}>
      <ExpenseInformation
        tripId={expenseData.id}
        title={expenseData.title}
        startDate={expenseData.startDate}
        endDate={expenseData.endDate}
        cities={expenseData.cities}
      />
      <Heading size="small" css={totalAmountStyling}>
        총 경비 :{' '}
        <span>
          {CURRENCY_ICON[DEFAULT_CURRENCY]} {formatNumberToMoney(expenseData.totalAmount)}
        </span>
      </Heading>
      <Box
        css={{
          position: 'relative',
          width: '300px',
        }}
      >
        <DonutChart segments={chartData} size={300} strokeWidth={60} />
      </Box>
      <ExpenseCategoryInformation tripId={tripId} />
    </section>
  );
};

export default TotalExpenseSection;
