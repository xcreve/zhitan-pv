package com.ruoyi.common.utils;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * 计算的工具类
 */
public class CalcUtil
{
    /**
     * 最大余额法，用于解决百分比不足100%或者超过100%的问题
     */
    public static double getPercentValue(int[] arr, int idx, int precision)
    {
        if ((arr.length - 1) < idx)
        {
            return 0;
        }
        double sum = 0;
        for (int j : arr)
        {
            sum += j;
        }
        if (sum == 0)
        {
            return 0;
        }
        double digits = Math.pow(10, precision);
        double[] votesPerQuota = new double[arr.length];
        for (int i = 0; i < arr.length; i++)
        {
            votesPerQuota[i] = arr[i] / sum * digits * 100;
        }
        double targetSeats = digits * 100;
        double[] seats = new double[arr.length];
        for (int i = 0; i < votesPerQuota.length; i++)
        {
            seats[i] = Math.floor(votesPerQuota[i]);
        }
        double currentSum = 0;
        for (double seat : seats)
        {
            currentSum += seat;
        }
        double[] remainder = new double[arr.length];
        for (int i = 0; i < seats.length; i++)
        {
            remainder[i] = votesPerQuota[i] - seats[i];
        }
        while (currentSum < targetSeats)
        {
            double max = 0;
            int maxId = 0;
            for (int i = 0; i < remainder.length; ++i)
            {
                if (remainder[i] > max)
                {
                    max = remainder[i];
                    maxId = i;
                }
            }
            ++seats[maxId];
            remainder[maxId] = 0;
            ++currentSum;
        }
        return seats[idx] / digits;
    }

    /**
     * 最大余额法，用于解决百分比不足100%或者超过100%的问题
     */
    public static double getPercentValue(BigDecimal[] arr, int idx, int precision)
    {
        if ((arr.length - 1) < idx)
        {
            return 0;
        }
        BigDecimal sum = BigDecimal.ZERO;
        for (BigDecimal j : arr)
        {
            sum = sum.add(j);
        }
        if (sum.compareTo(BigDecimal.ZERO) == 0)
        {
            return 0;
        }
        double digits = Math.pow(10, precision);
        double[] votesPerQuota = new double[arr.length];
        for (int i = 0; i < arr.length; i++)
        {
            double val = arr[i].divide(sum, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(digits * 100)).doubleValue();
            votesPerQuota[i] = val;
        }
        double targetSeats = digits * 100;
        double[] seats = new double[arr.length];
        for (int i = 0; i < votesPerQuota.length; i++)
        {
            seats[i] = Math.floor(votesPerQuota[i]);
        }
        double currentSum = 0;
        for (double seat : seats)
        {
            currentSum += seat;
        }
        double[] remainder = new double[arr.length];
        for (int i = 0; i < seats.length; i++)
        {
            remainder[i] = votesPerQuota[i] - seats[i];
        }
        while (currentSum < targetSeats)
        {
            double max = 0;
            int maxId = 0;
            for (int i = 0; i < remainder.length; ++i)
            {
                if (remainder[i] > max)
                {
                    max = remainder[i];
                    maxId = i;
                }
            }
            ++seats[maxId];
            remainder[maxId] = 0;
            ++currentSum;
        }
        return seats[idx] / digits;
    }

    public static double[] getPercentValue(int[] arr, int precision)
    {
        double[] result = new double[arr.length];
        for (int i = 0; i < arr.length; i++)
        {
            result[i] = getPercentValue(arr, i, precision);
        }
        return result;
    }

    public static double[] getPercentValue(BigDecimal[] arr, int precision)
    {
        double[] result = new double[arr.length];
        for (int i = 0; i < arr.length; i++)
        {
            result[i] = getPercentValue(arr, i, precision);
        }
        return result;
    }
}
