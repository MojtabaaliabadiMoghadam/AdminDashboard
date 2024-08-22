<?php

namespace App\Models\Lottery;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

/**
 * @property int $user_id
 * @property string $first_name_english
 * @property string $last_name_english
 * @property string $first_name_persian
 * @property string $last_name_persian
 * @property int $location_id
 * @property int $birth_country_id
 * @property int $birth_province_id
 * @property int $birth_city_id
 * @property Carbon $birthdate
 * @property string $nationality
 * @property int $citizenship_country_id
 * @property string|null $image
 * @property int $image_status
 * @property int $married_status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 */
class LotteryUser extends Model
{
    use SoftDeletes;

    // جدول مربوطه
    protected $table = 'lottery_users';

    // شناسه‌های قابل‌تخصیص برای مدل
    protected $primaryKey = 'user_id';

    // مقادیر پیش‌فرض
    protected $attributes = [
        'image_status' => 0,
        'married_status' => 0,
    ];

    // قابل‌تخصیص (fillable)
    protected $fillable = [
        'first_name_english',
        'last_name_english',
        'first_name_persian',
        'last_name_persian',
        'location_id',
        'birth_country_id',
        'birth_province_id',
        'birth_city_id',
        'birthdate',
        'nationality',
        'citizenship_country_id',
        'image',
        'image_status',
        'married_status',
    ];

    // تبدیل تاریخ‌ها به Carbon
    protected $dates = [
        'birthdate',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    // وضعیت‌های تصویر
    const IMAGE_STATUS_UNKNOWN = 0;
    const IMAGE_STATUS_UPLOADED = 1;
    const IMAGE_STATUS_APPROVED = 2;
    const IMAGE_STATUS_REJECTED = 3;

    // وضعیت‌های ازدواج
    const MARRIED_STATUS_UNKNOWN = 0;
    const MARRIED_STATUS_SINGLE = 1;
    const MARRIED_STATUS_MARRIED = 2;
    const MARRIED_STATUS_DIVORCED = 3;
    const MARRIED_STATUS_WIDOWED = 4;

    /**
     * وضعیت‌های تصویر را به صورت آرایه برمی‌گرداند
     * 
     * @return string[]
     */
    public static function getImageStatuses(): array
    {
        return [
            self::IMAGE_STATUS_UNKNOWN => 'نامشخص',
            self::IMAGE_STATUS_UPLOADED => 'آپلود شده',
            self::IMAGE_STATUS_APPROVED => 'تأیید شده',
            self::IMAGE_STATUS_REJECTED => 'رد شده',
        ];
    }

    /**
     * وضعیت‌های ازدواج را به صورت آرایه برمی‌گرداند
     * 
     * @return string[]
     */
    public static function getMarriedStatuses(): array
    {
        return [
            self::MARRIED_STATUS_UNKNOWN => 'نامشخص',
            self::MARRIED_STATUS_SINGLE => 'مجرد',
            self::MARRIED_STATUS_MARRIED => 'متأهل',
            self::MARRIED_STATUS_DIVORCED => 'طلاق گرفته',
            self::MARRIED_STATUS_WIDOWED => 'بیوه',
        ];
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo('App\Models\Location', 'location_id');
    }

    public function birthCountry(): BelongsTo
    {
        return $this->belongsTo('App\Models\Country', 'birth_country_id');
    }

    public function birthProvince(): BelongsTo
    {
        return $this->belongsTo('App\Models\Province', 'birth_province_id');
    }

    public function birthCity(): BelongsTo
    {
        return $this->belongsTo('App\Models\City', 'birth_city_id');
    }

    public function citizenshipCountry(): BelongsTo
    {
        return $this->belongsTo('App\Models\Country', 'citizenship_country_id');
    }
}
