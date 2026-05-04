package com.ruoyi.common.constant;

import java.math.BigDecimal;
import java.util.Locale;
import io.jsonwebtoken.Claims;

/**
 * 通用常量信息
 * 
 * @author ruoyi
 */
public class Constants
{
    /**
     * UTF-8 字符集
     */
    public static final String UTF8 = "UTF-8";

    /**
     * GBK 字符集
     */
    public static final String GBK = "GBK";

    /**
     * 系统语言
     */
    public static final Locale DEFAULT_LOCALE = Locale.SIMPLIFIED_CHINESE;

    /**
     * www主域
     */
    public static final String WWW = "www.";

    /**
     * http请求
     */
    public static final String HTTP = "http://";

    /**
     * https请求
     */
    public static final String HTTPS = "https://";

    /**
     * 通用成功标识
     */
    public static final String SUCCESS = "0";

    /**
     * 通用失败标识
     */
    public static final String FAIL = "1";

    /**
     * 登录成功
     */
    public static final String LOGIN_SUCCESS = "Success";

    /**
     * 注销
     */
    public static final String LOGOUT = "Logout";

    /**
     * 注册
     */
    public static final String REGISTER = "Register";

    /**
     * 登录失败
     */
    public static final String LOGIN_FAIL = "Error";

    /**
     * 所有权限标识
     */
    public static final String ALL_PERMISSION = "*:*:*";

    /**
     * 管理员角色权限标识
     */
    public static final String SUPER_ADMIN = "admin";

    /**
     * 角色权限分隔符
     */
    public static final String ROLE_DELIMITER = ",";

    /**
     * 权限标识分隔符
     */
    public static final String PERMISSION_DELIMITER = ",";

    /**
     * 验证码有效期（分钟）
     */
    public static final Integer CAPTCHA_EXPIRATION = 2;

    /**
     * 令牌
     */
    public static final String TOKEN = "token";

    /**
     * 令牌前缀
     */
    public static final String TOKEN_PREFIX = "Bearer ";

    /**
     * 令牌前缀
     */
    public static final String LOGIN_USER_KEY = "login_user_key";

    /**
     * 用户ID
     */
    public static final String JWT_USERID = "userid";

    /**
     * 用户名称
     */
    public static final String JWT_USERNAME = Claims.SUBJECT;

    /**
     * 用户头像
     */
    public static final String JWT_AVATAR = "avatar";

    /**
     * 创建时间
     */
    public static final String JWT_CREATED = "created";

    /**
     * 用户权限
     */
    public static final String JWT_AUTHORITIES = "authorities";

    /**
     * 资源映射路径 前缀
     */
    public static final String RESOURCE_PREFIX = "/profile";

    /**
     * RMI 远程方法调用
     */
    public static final String LOOKUP_RMI = "rmi:";

    /**
     * LDAP 远程方法调用
     */
    public static final String LOOKUP_LDAP = "ldap:";

    /**
     * LDAPS 远程方法调用
     */
    public static final String LOOKUP_LDAPS = "ldaps:";

    /**
     * 自动识别json对象白名单配置（仅允许解析的包名，范围越小越安全）
     */
    public static final String[] JSON_WHITELIST_STR = { "com.ruoyi" };

    /**
     * 定时任务白名单配置（仅允许访问的包名，如其他需要可以自行添加）
     */
    public static final String[] JOB_WHITELIST_STR = { "com.ruoyi.quartz.task" };

    /**
     * 定时任务违规的字符
     */
    public static final String[] JOB_ERROR_STR = { "java.net.URL", "javax.naming.InitialContext", "org.yaml.snakeyaml",
            "org.springframework", "org.apache", "com.ruoyi.common.utils.file", "com.ruoyi.common.config", "com.ruoyi.generator" };

    public static final int DIGIT_0 = 0;

    public static final int DIGIT_1 = 1;

    public static final int DIGIT_2 = 2;

    public static final int DIGIT_3 = 3;

    public static final int DIGIT_4 = 4;

    public static final int DIGIT_100 = 100;

    public static final int DIGIT_1000 = 1000;

    public static final int DIGIT_10000 = 10000;

    public static final int DIGIT_3600 = 3600;

    public static final int DIGIT_MINUS_1 = -1;

    public static final double DIGIT_DOUBLE_0 = 0D;

    public static final double DIGIT_DOUBLE_00 = 0.00D;

    public static final double DIGIT_DOUBLE_1 = 1.0D;

    public static final double DIGIT_DOUBLE_100 = 100D;

    public static final double MIN_INIT_VALUE = -99;

    public static final BigDecimal UNIT_CONVERSION_100 = new BigDecimal(100);

    public static final BigDecimal UNIT_CONVERSION_1000 = new BigDecimal(1000);

    public static final BigDecimal UNIT_CONVERSION_10000 = new BigDecimal(10000);

    public static final String STR_NUMBER_0 = "0";

    public static final String STR_NUMBER_1 = "1";

    public static final String STR_NUMBER_2 = "2";

    public static final String STR_MINUS_1 = "-1";

    public static final String EMPTY = "";

    public static final String SINGLE_MINUS_SIGN = "-";

    public static final String DOUBLE_MINUS_SIGN = "--";

    public static final String STR_UNDERLINE = "_";

    public static final String STR_LINE = "-";

    public static final String ENERGY_COMPARISON_YOY = "YOY";

    public static final String ENERGY_COMPARISON_MOM = "MOM";

    public static final String TAG_CODE_ZYGGL = "_PW";

    public static final String TAG_CODE_Q = "_Q";

    public static final String TAG_CODE_HZ = "_HZ";

    public static final String TAG_CODE_UA = "_UA";

    public static final String TAG_CODE_UB = "_UB";

    public static final String TAG_CODE_UC = "_UC";

    public static final String TAG_CODE_IA = "_IA";

    public static final String TAG_CODE_IB = "_IB";

    public static final String TAG_CODE_IC = "_IC";

    public static final String TAG_CODE_ACC = "_Acc";

    public static final String TAG_CODE_CGL = "_CGL";

    public static final String TAG_CODE_IE = "_IE";

    public static final String WORD_M = "M";

    public static final String WORD_Y = "Y";

    public static final String WORD_D = "D";

    public static final String WORD_H = "H";

    public static final String ELECTRIC_LOAD_UNIT = "(kW)";

    public static final String ELECTRIC_LOAD_UNIT_SHOW = "kW";

    public static final String ELECTRIC_LOAD_UNIT_MW = "MW";

    public static final String ELECTRIC_UNIT_KWH = "kWh";

    public static final String ELECTRIC_UNIT_W_KWH = "万kWh";

    public static final String UNIT_PCS = "个";

    public static final String UNIT_YUAN = "元";

    public static final String UNIT_W_YUAN = "万元";

    public static final String UNIT_KG = "kg";

    public static final String UNIT_T = "吨";

    public static final String SYMBOL_PERCENT = "%";

    public static final String COMMON_PATTERN = "yyyy-MM-dd HH:mm:ss";

    public static final String COMMON_PATTERN_END_WITH_MINUTE = "yyyy-MM-dd HH:mm";

    public static final String COMMON_PATTERN_HOUR_MINUTE = "HH:mm";

    public static final String COMMON_PATTERN_YEAR = "yyyy";

    public static final String COMMON_PATTERN_MONTH = "yyyyMM";

    public static final String COMMON_PATTERN_TO_MONTH = "yyyy-MM";

    public static final String COMMON_PATTERN_DAY = "yyyyMMdd";

    public static final String COMMON_PATTERN_TO_DAY = "yyyy-MM-dd";

    public static final String COMMON_PATTERN_DAY_OF_MONTH = "dd";

    public static final String COMMON_PATTERN_HOUR = "yyyyMMddHH";

    public static final String COMMON_PATTERN_TO_HOUR = "yyyy-MM-dd HH";

    /**
     * 部门相关常量
     */
    public static class Dept
    {
        /**
         * 全部数据权限
         */
        public static final String DATA_SCOPE_ALL = "1";

        /**
         * 自定数据权限
         */
        public static final String DATA_SCOPE_CUSTOM = "2";

        /**
         * 部门数据权限
         */
        public static final String DATA_SCOPE_DEPT = "3";

        /**
         * 部门及以下数据权限
         */
        public static final String DATA_SCOPE_DEPT_AND_CHILD = "4";

        /**
         * 仅本人数据权限
         */
        public static final String DATA_SCOPE_SELF = "5";
    }
}
