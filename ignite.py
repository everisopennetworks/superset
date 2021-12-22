from superset.db_engine_specs.base import BaseEngineSpec


class IgniteEngineSpec(BaseEngineSpec):
    engine = "ignite"
    engine_name = "Ignite"

    _time_grain_expressions = {
        None: "{col}",
        "PT1S": "PARSEDATETIME(FORMATDATETIME({col}, 'yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd HH:mm:ss')",
        "PT1M": "PARSEDATETIME(FORMATDATETIME({col}, 'yyyy-MM-dd HH:mm'), 'yyyy-MM-dd HH:mm')",
        "PT1H": "PARSEDATETIME(FORMATDATETIME({col}, 'yyyy-MM-dd HH'), 'yyyy-MM-dd HH')",
        "P1D": "PARSEDATETIME(FORMATDATETIME({col}, 'yyyy-MM-dd'), 'yyyy-MM-dd')",
        "P1W": "PARSEDATETIME(FORMATDATETIME({col}, 'yyyy-ww'), 'yyyy-ww')",
        "P1M": "PARSEDATETIME(FORMATDATETIME({col}, 'yyyy-MM'), 'yyyy-MM')",
        "P1Y": "PARSEDATETIME(FORMATDATETIME({col}, 'yyyy'), 'yyyy')",
    }

    @classmethod
    def epoch_to_dttm(cls) -> str:
        return "DATEADD('SECOND', {col}, DATE '1970-01-01')"

    @classmethod
    def epoch_ms_to_dttm(cls) -> str:
        return "DATEADD('MILLISECOND', {col}, DATE '1970-01-01')"
