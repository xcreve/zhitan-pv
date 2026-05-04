package com.ruoyi.common.utils;

import cn.hutool.core.util.ObjectUtil;

/**
 * 数字工具类
 */
public class DoubleUtil
{
    public static double toDouble(String str)
    {
        double d = 0;
        try
        {
            d = Double.parseDouble(str);
        }
        catch (Exception e)
        {
            d = 0;
        }
        return d;
    }

    public static double toDouble(long l)
    {
        return toDouble(l + "");
    }

    public static double toDouble(Object l)
    {
        return toDouble(l + "");
    }

    public static double toDouble(int i)
    {
        return toDouble(i + "");
    }

    public static String formatDoubleToStr(Double value, int format)
    {
        if (ObjectUtil.isEmpty(value))
        {
            value = 0.00;
        }
        return String.format("%." + format + "f", value);
    }

    public static String formatDoubleToStr(Double value)
    {
        return formatDoubleToStr(value, 2);
    }

    public static double formatDouble(Double value, int format)
    {
        if (ObjectUtil.isEmpty(value))
        {
            return 0D;
        }
        String str = formatDoubleToStr(value, format);
        return toDouble(str);
    }

    public static double formatDouble(Double value)
    {
        if (ObjectUtil.isEmpty(value))
        {
            return 0D;
        }
        return formatDouble(value, 2);
    }
}
