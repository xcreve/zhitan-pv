package com.ruoyi.common.utils;

import static com.ruoyi.common.enums.TimeTypeEnum.DAY;
import static com.ruoyi.common.enums.TimeTypeEnum.HOUR;
import static com.ruoyi.common.enums.TimeTypeEnum.MONTH;
import static com.ruoyi.common.enums.TimeTypeEnum.YEAR;

import cn.hutool.core.date.DateTime;
import cn.hutool.core.util.ObjectUtil;
import com.ruoyi.common.constant.Constants;
import com.ruoyi.common.enums.TimeTypeEnum;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

/**
 * 时间工具类
 */
@Slf4j
public class DateTimeUtil
{
    public static final String COMMON_PATTERN = "yyyy-MM-dd HH:mm:ss";
    public static final String COMMON_PATTERN_END_WITH_MINUTE = "yyyy-MM-dd HH:mm";
    public static final String COMMON_PATTERN_HOUR_MINUTE = "HH:mm";
    public static final String COMMON_PATTERN_YEAR = "yyyy";
    public static final String COMMON_PATTERN_CERTAIN_YEAR = "yy";
    public static final String COMMON_PATTERN_MONTH = "yyyyMM";
    public static final String COMMON_PATTERN_TO_MONTH = "yyyy-MM";
    public static final String COMMON_PATTERN_TO_MONTH_WORD = "yyyy-MM月";
    public static final String COMMON_PATTERN_TO_MONTH_ZH = "yyyy年MM月";
    public static final String COMMON_PATTERN_DAY = "yyyyMMdd";
    public static final String COMMON_PATTERN_TO_DAY = "yyyy-MM-dd";
    public static final String COMMON_PATTERN_TO_DAY_WORD = "yyyy-MM-dd日";
    public static final String COMMON_PATTERN_MONTH_DAY = "MM-dd";
    public static final String COMMON_PATTERN_DAY_OF_MONTH = "dd";
    public static final String COMMON_PATTERN_HOUR = "yyyyMMddHH";
    public static final String COMMON_PATTERN_TO_HOUR = "yyyy-MM-dd HH";
    public static final String COMMON_PATTERN_TO_HOUR_WORD = "yyyy-MM-dd HH时";
    public static final String COMMON_PATTERN_TO_HOUR_TEXT = "yyyy年MM月dd日 HH时";

    public static String getNowDateTime()
    {
        return getNowDateTime(COMMON_PATTERN);
    }

    public static String getNowDateTime(String pattern)
    {
        SimpleDateFormat df = new SimpleDateFormat(pattern);
        return df.format(new Date());
    }

    public static String getNowYear()
    {
        return getNowDateTime(COMMON_PATTERN_YEAR);
    }

    public static String getNowMonth()
    {
        return getNowDateTime(COMMON_PATTERN_MONTH);
    }

    public static Date toDateTime(String dateTimeStr)
    {
        DateTime dt = null;
        try
        {
            dt = DateTime.of(dateTimeStr, COMMON_PATTERN);
        }
        catch (Exception e)
        {
            log.debug("Failed to parse datetime {}", dateTimeStr, e);
        }
        return dt;
    }

    public static Date toDateTime(String dateTimeStr, String pattern)
    {
        DateTime dt = null;
        try
        {
            dt = DateTime.of(dateTimeStr, pattern);
        }
        catch (Exception e)
        {
            log.debug("Failed to parse datetime {} with pattern {}", dateTimeStr, pattern, e);
        }
        return dt;
    }

    public static String toDateTimeStr(String dateTimeStr, String sourcePattern, String toPattern)
    {
        String str = Constants.EMPTY;
        try
        {
            DateTime dt = DateTime.of(dateTimeStr, sourcePattern);
            str = getDateTime(dt, toPattern);
        }
        catch (Exception e)
        {
            log.debug("Failed to convert datetime {}", dateTimeStr, e);
        }
        return str;
    }

    public static String getDateTime(Date dt, String pattern)
    {
        SimpleDateFormat df = new SimpleDateFormat(pattern);
        return df.format(dt);
    }

    public static String getDateTime(Date dt)
    {
        if (ObjectUtil.isEmpty(dt))
        {
            return Constants.EMPTY;
        }
        return getDateTime(dt, COMMON_PATTERN);
    }

    public static int getDateTimeLastDay(Date dt)
    {
        String month = getMonth(dt);
        String firstDate = month + "01";
        Date nextMonthFirstDate = addMonths(toDateTime(firstDate, COMMON_PATTERN_DAY), Constants.DIGIT_1);
        Date currentMonthLastDate = addDays(nextMonthFirstDate, Constants.DIGIT_MINUS_1);
        return Integer.parseInt(getDateTime(currentMonthLastDate, COMMON_PATTERN_DAY_OF_MONTH));
    }

    public static String getYear(Date dt)
    {
        return getDateTime(dt, COMMON_PATTERN_YEAR);
    }

    public static String getMonth(Date dt)
    {
        return getDateTime(dt, COMMON_PATTERN_MONTH);
    }

    public static String toDay(Date dt)
    {
        return getDateTime(dt, COMMON_PATTERN_DAY);
    }

    public static String toHour(Date dt)
    {
        return getDateTime(dt, COMMON_PATTERN_HOUR);
    }

    public static String toString(Date dt)
    {
        return getDateTime(dt, COMMON_PATTERN);
    }

    public static Date addYears(Date dateTime, int years)
    {
        return calcDate(dateTime, years, Calendar.YEAR);
    }

    public static Date addMonths(Date dateTime, int months)
    {
        return calcDate(dateTime, months, Calendar.MONTH);
    }

    public static Date addDays(Date dateTime, int days)
    {
        return calcDate(dateTime, days, Calendar.DATE);
    }

    public static Date addHours(Date dateTime, int hours)
    {
        return calcDate(dateTime, hours, Calendar.HOUR);
    }

    public static Date addMinutes(Date dateTime, int minutes)
    {
        return calcDate(dateTime, minutes, Calendar.MINUTE);
    }

    public static Date addSeconds(Date dateTime, int seconds)
    {
        return calcDate(dateTime, seconds, Calendar.SECOND);
    }

    private static Date calcDate(Date dateTime, int addValue, int calendarType)
    {
        Date dt = null;
        try
        {
            Calendar calendar = new GregorianCalendar();
            calendar.setTime(dateTime);
            calendar.add(calendarType, addValue);
            Date tempDt = calendar.getTime();
            String temp = getDateTime(tempDt, COMMON_PATTERN);
            dt = toDateTime(temp);
        }
        catch (Exception e)
        {
            log.debug("Failed to calculate date {}", dateTime, e);
        }
        return dt;
    }

    public static int getHourOfDay(Date dateTime)
    {
        return getDateValue(dateTime, Calendar.HOUR_OF_DAY);
    }

    public static int getDayOfMonth(Date dateTime)
    {
        return getDateValue(dateTime, Calendar.DAY_OF_MONTH);
    }

    public static int getDayOfWeek(Date dateTime)
    {
        return getDateValue(dateTime, Calendar.DAY_OF_WEEK);
    }

    public static int getMonthOfYear(Date dateTime)
    {
        return getDateValue(dateTime, Calendar.MONTH) + 1;
    }

    private static int getDateValue(Date dateTime, int calendarType)
    {
        int value = 0;
        try
        {
            if (ObjectUtil.isEmpty(dateTime))
            {
                dateTime = new Date();
            }
            Calendar calendar = new GregorianCalendar();
            calendar.setTime(dateTime);
            value = calendar.get(calendarType);
        }
        catch (Exception e)
        {
            log.debug("Failed to read date field {}", calendarType, e);
        }
        return value;
    }

    public static int compareDateDiff(Date time1, Date time2)
    {
        long diff = time1.getTime() - time2.getTime();
        int res = 0;
        if (diff > 0)
        {
            res = 1;
        }
        else if (diff < 0)
        {
            res = -1;
        }
        return res;
    }

    public static double dateHourDiff(Date start, Date end)
    {
        if (start == null || end == null)
        {
            return 0;
        }
        Instant startInstant = start.toInstant();
        Instant endInstant = end.toInstant();
        ZoneId zoneId = ZoneId.systemDefault();
        LocalDateTime startLocalDateTime = startInstant.atZone(zoneId).toLocalDateTime();
        LocalDateTime endLocalDateTime = endInstant.atZone(zoneId).toLocalDateTime();
        long minutes = Duration.between(startLocalDateTime, endLocalDateTime).toMinutes();
        double hours = Math.abs((double) minutes / 60);
        DecimalFormat df = new DecimalFormat("#.00");
        String result = df.format(hours);
        return Double.parseDouble(result);
    }

    public static String getTimeCode(String timeType, Date date)
    {
        String timeCode = Constants.EMPTY;
        if (ObjectUtil.isEmpty(date))
        {
            date = new Date();
        }
        timeType = StringUtils.defaultString(timeType).toUpperCase();
        if (HOUR.name().equals(timeType))
        {
            timeCode = Constants.WORD_H + getDateTime(date, COMMON_PATTERN_HOUR);
        }
        else if (DAY.name().equals(timeType))
        {
            timeCode = Constants.WORD_D + getDateTime(date, COMMON_PATTERN_DAY);
        }
        else if (MONTH.name().equals(timeType))
        {
            timeCode = Constants.WORD_M + getDateTime(date, COMMON_PATTERN_MONTH);
        }
        else if (YEAR.name().equals(timeType))
        {
            timeCode = Constants.WORD_Y + getDateTime(date, COMMON_PATTERN_YEAR);
        }
        return timeCode;
    }

    public static Date getHourTime(TimeTypeEnum timeType, Date date)
    {
        Date dt = null;
        if (ObjectUtil.isEmpty(date))
        {
            date = new Date();
        }
        String tempStr = null;
        switch (timeType)
        {
            case HOUR:
                tempStr = getDateTime(date, COMMON_PATTERN_TO_HOUR);
                dt = toDateTime(tempStr, COMMON_PATTERN_TO_HOUR);
                break;
            case DAY:
                tempStr = getDateTime(date, COMMON_PATTERN_TO_DAY);
                dt = toDateTime(tempStr, COMMON_PATTERN_TO_DAY);
                break;
            case MONTH:
                tempStr = getDateTime(date, COMMON_PATTERN_TO_MONTH);
                dt = toDateTime(tempStr, COMMON_PATTERN_TO_MONTH);
                break;
            case YEAR:
                tempStr = getDateTime(date, COMMON_PATTERN_YEAR);
                dt = toDateTime(tempStr, COMMON_PATTERN_YEAR);
                break;
            default:
                break;
        }
        return dt;
    }
}
